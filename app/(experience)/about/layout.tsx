import { Fredoka } from "next/font/google";
import type { ReactNode } from "react";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cartoon",
  display: "swap",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <div className={`${fredoka.variable} about-cartoon`}>{children}</div>;
}
