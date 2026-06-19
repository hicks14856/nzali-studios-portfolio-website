import { SecureImage } from "@/components/security/SecureImage";
import { artworks } from "@/lib/artworks";
import { SectionContainer } from "./section-container";
import { ArtworkFrame } from "./artwork-frame";

const closingPiece = artworks.find((a) => a.id === "soft-edge");

export function ContactSection() {
  const headingId = "contact-heading";

  return (
    <SectionContainer id="contact" labelledBy={headingId} sketchVariant="crimson">
      <div className="relative mx-auto max-w-prose text-center">
        {closingPiece ? (
          <div className="pointer-events-none absolute -right-8 -top-16 hidden w-40 opacity-20 lg:block">
            <ArtworkFrame variant={closingPiece.frame} tilt={closingPiece.tilt}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <SecureImage
                  src={closingPiece.src}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </ArtworkFrame>
          </div>
        ) : null}

        <p className="label-luxury mb-4 text-crimson-muted/60">Contact</p>
        <h2 id={headingId} className="heading-section mb-6">
          Commissions &amp; Inquiries
        </h2>
        <p className="body-prose mb-4 text-graphite-light">
          For private viewings, commission requests, or press — reach out with
          intention. Responses are considered, not rushed.
        </p>
        <p className="font-heading mb-8 text-lg italic text-graphite-light/80">
          Every commission begins with a conversation — the way every piece here began
          with a single line.
        </p>
        <a
          href="mailto:studio@nzali.art"
          className="sketch-border sketch-border-crimson inline-block rounded-sketch px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-crimson-dark/30"
        >
          studio@nzali.art
        </a>
      </div>
    </SectionContainer>
  );
}
