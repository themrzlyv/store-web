import type { Metadata } from "next";

export const generateMetadata = (data: {
  title?: string;
  description: string;
  keywords?: string | Array<string> | null;
  exactUrl?: string;
  image?: string;
}): Metadata => {
  const { title, description, keywords, exactUrl, image: imageURL } = data;
  const metadata: Metadata = {
    title: title
      ? `${title} | Samir Mirzaliyev`
      : "Samir Mirzaliyev's personal blog",
    description,
    keywords,
    authors: [{ name: "Samir Mirzaliyev", url: "https://themirzaliyev.store" }],
    openGraph: {
      title,
      description,
      url: exactUrl || "https://themirzaliyev.store",
      siteName: title,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Samir Mirzaliyev's personal blog",
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: "@themrzlyv",
      site: "@themrzlyv",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Samir Mirzaliyev's personal blog",
        },
      ],
    },
    metadataBase: new URL("https://themirzaliyev.store"),
  };

  if (imageURL && Boolean(imageURL)) {
    const image = {
      url: imageURL,
      type: "image/png",
      width: 1200,
      height: 630,
    };
    if (metadata.openGraph) metadata.openGraph["images"] = image;
    if (metadata.twitter) metadata.twitter["images"] = image;
  }

  return metadata;
};
