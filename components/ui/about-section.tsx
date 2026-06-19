import { SecureImage } from "@/components/security/SecureImage";
import { getArtworksByChapter } from "@/lib/artworks";
import { siteContent } from "@/lib/content";
import { ArtworkFrame } from "./artwork-frame";
import { SectionContainer } from "./section-container";

export function AboutSection() {
  const headingId = "about-heading";
  const heritage = getArtworksByChapter("heritage");
  const guidingHand = heritage.find((a) => a.id === "guiding-hand");
  const rootedHands = heritage.find((a) => a.id === "rooted-hands");

  return (
    <SectionContainer id="about" labelledBy={headingId} sketchVariant="crimson">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-4">
          <p className="label-luxury mb-4 text-crimson-muted/60">About the Artist</p>
          <h2 id={headingId} className="heading-section">
            The hand behind the line
          </h2>
          <div className="sketch-divider mt-8 max-w-[8rem]" role="presentation" />

          {guidingHand ? (
            <ArtworkFrame
              variant={guidingHand.frame}
              tilt={guidingHand.tilt}
              caption={guidingHand.memory}
              className="mt-10 hidden max-w-[14rem] lg:block"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <SecureImage
                  src={guidingHand.src}
                  alt={guidingHand.title}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            </ArtworkFrame>
          ) : null}
        </header>

        <div className="lg:col-span-8">
          <p className="body-prose mb-6 text-lg text-charcoal/90">
            {siteContent.bio.intro}
          </p>
          {siteContent.bio.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="body-prose mb-5 last:mb-0">
              {paragraph}
            </p>
          ))}

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:hidden">
            {guidingHand ? (
              <ArtworkFrame
                variant={guidingHand.frame}
                tilt={guidingHand.tilt}
                caption={guidingHand.memory}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <SecureImage
                    src={guidingHand.src}
                    alt={guidingHand.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </ArtworkFrame>
            ) : null}
            {rootedHands ? (
              <ArtworkFrame
                variant={rootedHands.frame}
                tilt={rootedHands.tilt}
                caption={rootedHands.memory}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <SecureImage
                    src={rootedHands.src}
                    alt={rootedHands.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </ArtworkFrame>
            ) : null}
          </div>
        </div>

        {rootedHands ? (
          <aside className="hidden lg:col-span-12 lg:mt-4 lg:block">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr]">
              <blockquote className="max-w-md border-l border-crimson-muted/30 pl-6">
                <p className="font-heading text-2xl italic text-graphite-light">
                  &ldquo;{rootedHands.memory}&rdquo;
                </p>
                <footer className="mt-3 font-body text-xs uppercase tracking-widest text-graphite/60">
                  — {rootedHands.title}
                </footer>
              </blockquote>
              <ArtworkFrame
                variant={rootedHands.frame}
                tilt={rootedHands.tilt}
                className="mx-auto w-full max-w-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <SecureImage
                    src={rootedHands.src}
                    alt={rootedHands.title}
                    fill
                    sizes="512px"
                    className="object-cover object-center"
                  />
                </div>
              </ArtworkFrame>
            </div>
          </aside>
        ) : null}
      </div>
    </SectionContainer>
  );
}
