import { siteContent } from "@/lib/content";

type ArtistNameProps = {
  as?: "h1" | "span" | "p";
  className?: string;
  id?: string;
  variant?: "display" | "nav" | "login";
};

const variantClass: Record<NonNullable<ArtistNameProps["variant"]>, string> = {
  display: "heading-signature",
  nav: "nav-signature",
  login: "login-signature",
};

export function ArtistName({
  as: Tag = "span",
  className = "",
  id,
  variant = "display",
}: ArtistNameProps) {
  return (
    <Tag id={id} className={`${variantClass[variant]} ${className}`.trim()}>
      {siteContent.artist.name}
    </Tag>
  );
}
