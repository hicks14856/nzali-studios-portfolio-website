"use client";

import { useState } from "react";
import { SketchBorder } from "./sketch-border";
import { ArtistName } from "./artist-name";

type LoginScreenProps = {
  onEnter: () => void;
};

export function LoginScreen({ onEnter }: LoginScreenProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onEnter();
  }

  return (
    <main
      className="login-fade-in relative z-[1] flex min-h-dvh items-center justify-center px-4 py-12"
      aria-label="Private gallery access"
    >
      <SketchBorder
        variant="crimson"
        className="w-full max-w-md bg-velvet-surface/90 shadow-luxury"
      >
        <div className="sketch-padding text-center">
          <p className="label-luxury mb-4 text-crimson-muted/80">Private Viewing</p>
          <ArtistName as="h1" variant="login" className="mb-2" />
          <p className="body-prose mx-auto mb-8 max-w-xs text-sm text-graphite-light">
            Enter the studio. A quiet room of graphite and shadow awaits.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-left">
              <label
                htmlFor="access-key"
                className="label-luxury mb-2 block text-graphite-light"
              >
                Access Key
              </label>
              <input
                id="access-key"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="sketch-border w-full rounded-sketch border-0 bg-velvet-muted px-4 py-3 font-body text-sm text-charcoal placeholder:text-graphite/60 focus:outline-none focus:ring-1 focus:ring-crimson-muted/40"
              />
            </div>

            <button
              type="submit"
              className="sketch-border sketch-border-crimson w-full rounded-sketch bg-crimson-dark/40 px-6 py-3 font-body text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-crimson-muted/30"
            >
              Enter Gallery
            </button>
          </form>

          <p className="mt-8 font-body text-xs text-graphite/70">
            Invitation only ·{" "}
            <a
              href="/contact"
              className="text-crimson-muted/70 underline-offset-4 hover:text-crimson-muted hover:underline"
            >
              Request access
            </a>
          </p>
        </div>
      </SketchBorder>
    </main>
  );
}
