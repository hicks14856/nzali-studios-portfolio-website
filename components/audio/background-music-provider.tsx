"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BACKGROUND_TRACK,
  MUSIC_STORAGE_KEY,
} from "@/lib/audio-config";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
};

type YTPlayerConstructor = new (
  element: HTMLElement | string,
  options: {
    height: string;
    width: string;
    videoId: string;
    playerVars: Record<string, number | string>;
    events: {
      onReady?: (event: { target: YTPlayer }) => void;
      onStateChange?: (event: { data: number; target: YTPlayer }) => void;
      onError?: () => void;
    };
  }
) => YTPlayer;

declare global {
  interface Window {
    YT?: {
      Player: YTPlayerConstructor;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type BackgroundMusicContextValue = {
  isPlaying: boolean;
  isReady: boolean;
  start: () => void;
  toggle: () => void;
  pause: () => void;
};

const BackgroundMusicContext =
  createContext<BackgroundMusicContextValue | null>(null);

const BACKGROUND_VOLUME = 45;
const YOUTUBE_SCRIPT_ID = "youtube-iframe-api";

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    window.onYouTubeIframeAPIReady = finish;

    const existing = document.getElementById(YOUTUBE_SCRIPT_ID);
    if (!existing) {
      const script = document.createElement("script");
      script.id = YOUTUBE_SCRIPT_ID;
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    const poll = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(poll);
        finish();
      }
    }, 80);

    window.setTimeout(() => {
      window.clearInterval(poll);
      finish();
    }, 8000);
  });
}

function writeMusicPreference(enabled: boolean): void {
  sessionStorage.setItem(MUSIC_STORAGE_KEY, enabled ? "1" : "0");
}

type BackgroundMusicProviderProps = {
  children: ReactNode;
};

export function BackgroundMusicProvider({
  children,
}: BackgroundMusicProviderProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const pendingStartRef = useRef(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryPlay = useCallback(() => {
    if (!playerRef.current) {
      return false;
    }

    try {
      playerRef.current.setVolume(BACKGROUND_VOLUME);
      playerRef.current.playVideo();
      pendingStartRef.current = false;
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initPlayer() {
      try {
        await loadYouTubeApi();

        if (cancelled || !hostRef.current || playerRef.current || !window.YT) {
          return;
        }

        playerRef.current = new window.YT.Player(hostRef.current, {
          height: "1",
          width: "1",
          videoId: BACKGROUND_TRACK.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            origin:
              typeof window !== "undefined" ? window.location.origin : "",
            playlist: BACKGROUND_TRACK.videoId,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(BACKGROUND_VOLUME);
              setPlayerReady(true);

              if (pendingStartRef.current) {
                tryPlay();
              }
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === window.YT?.PlayerState.PLAYING);
            },
            onError: () => {
              setIsPlaying(false);
            },
          },
        });
      } catch {
        setPlayerReady(false);
      }
    }

    void initPlayer();

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [tryPlay]);

  const start = useCallback(() => {
    writeMusicPreference(true);
    pendingStartRef.current = true;

    if (playerReady) {
      tryPlay();
    }
  }, [playerReady, tryPlay]);

  const pause = useCallback(() => {
    writeMusicPreference(false);
    pendingStartRef.current = false;

    try {
      playerRef.current?.pauseVideo();
    } catch {
      // Player may not be ready yet.
    }

    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }

    start();
  }, [isPlaying, pause, start]);

  return (
    <BackgroundMusicContext.Provider
      value={{
        isPlaying,
        isReady: playerReady,
        start,
        toggle,
        pause,
      }}
    >
      <div
        className="pointer-events-none fixed -left-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div ref={hostRef} />
      </div>
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic(): BackgroundMusicContextValue {
  const context = useContext(BackgroundMusicContext);

  if (!context) {
    throw new Error(
      "useBackgroundMusic must be used within BackgroundMusicProvider"
    );
  }

  return context;
}

export function useBackgroundMusicOptional() {
  return useContext(BackgroundMusicContext);
}
