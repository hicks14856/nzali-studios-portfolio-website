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

type SecurityContextValue = {
  showCopyNotice: () => void;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error("useSecurity must be used within SecurityProvider");
  }
  return context;
}

type SecurityProviderProps = {
  children: ReactNode;
};

const NOTICE_TEXT = "Content Copywritten © Nzali";
const NOTICE_DURATION_MS = 2800;
const NOTICE_COOLDOWN_MS = 1200;

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [data-security-allow]'
    )
  );
}

function isBlockedShortcut(event: KeyboardEvent): boolean {
  const key = event.key.toLowerCase();
  const meta = event.metaKey;
  const ctrl = event.ctrlKey;
  const shift = event.shiftKey;
  const alt = event.altKey;
  const mod = meta || ctrl;

  if (key === "f12") return true;

  if (mod && shift && key === "i") return true;
  if (mod && alt && key === "i") return true;
  if (mod && key === "s") return true;
  if (mod && key === "u") return true;

  return false;
}

function SecurityNotice({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[
        "pointer-events-none fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2",
        "rounded-sketch border border-charcoal/15 bg-velvet-surface/95 px-5 py-3",
        "font-body text-xs uppercase tracking-[0.28em] text-graphite-light shadow-luxury backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
      ].join(" ")}
    >
      {NOTICE_TEXT}
    </div>
  );
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const [noticeVisible, setNoticeVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownRef = useRef(false);

  const showCopyNotice = useCallback(() => {
    if (cooldownRef.current) return;

    cooldownRef.current = true;
    setNoticeVisible(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setNoticeVisible(false);
      hideTimerRef.current = setTimeout(() => {
        cooldownRef.current = false;
      }, NOTICE_COOLDOWN_MS);
    }, NOTICE_DURATION_MS);
  }, []);

  useEffect(() => {
    function handleContextMenu(event: MouseEvent) {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      showCopyNotice();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target) && !isBlockedShortcut(event)) return;
      if (!isBlockedShortcut(event)) return;
      event.preventDefault();
      showCopyNotice();
    }

    function handleDragStart(event: DragEvent) {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("dragstart", handleDragStart);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [showCopyNotice]);

  return (
    <SecurityContext.Provider value={{ showCopyNotice }}>
      {children}
      <SecurityNotice visible={noticeVisible} />
    </SecurityContext.Provider>
  );
}
