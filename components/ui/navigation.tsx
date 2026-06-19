"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MusicToggleButton } from "@/components/audio/music-controls";
import { ArtistName } from "@/components/ui/artist-name";
import { siteContent } from "@/lib/content";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Primary"
        className="sketch-border sketch-border-crimson flex w-full max-w-5xl items-center justify-between rounded-sketch bg-velvet/80 px-5 py-3 shadow-luxury backdrop-blur-xl sm:px-8 sm:py-4"
      >
        <Link href="/studio" className="group">
          <ArtistName variant="nav" className="group-hover:text-crimson-muted" />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <MusicToggleButton />
          <ul className="flex items-center gap-4 sm:gap-7">
          {siteContent.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/studio" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`label-luxury relative text-[0.62rem] transition-colors sm:text-xs ${
                    active
                      ? "text-crimson-muted"
                      : "text-graphite-light hover:text-charcoal"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-crimson-muted/70"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
