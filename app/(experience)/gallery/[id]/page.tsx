import { ArtworkDetailPage } from "@/components/ui/artwork-detail";
import { getArtworkById, artworks } from "@/lib/artworks";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return artworks.map((artwork) => ({ id: artwork.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return { title: "Work not found — Nzali" };
  }

  return {
    title: `${artwork.title} — Nzali`,
    description: artwork.story,
  };
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  return <ArtworkDetailPage id={id} />;
}
