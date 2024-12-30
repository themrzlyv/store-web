import type { Metadata } from "next";
import { Inter, JosefinSans } from "@/styles/fonts";
import { MainProviders } from "@/shared/providers/main-providers";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Script from "next/script";
import { generateMetadata } from "@/lib/generate-metadata";
import { Meta } from "@/shared/components/meta/meta";

export const metadata: Metadata = {
  ...generateMetadata({
    description:
      "A passionate and innovative full-stack software developer from Azerbaijan",
    keywords: [
      "samir mirzaliyev",
      "samir",
      "mirzaliyev",
      "samirmirzaliyev",
      "front-end",
      "full-stack",
      "software engineer",
      "bio",
      "developer",
      "portfolio",
      "development",
      "mobile",
      "web",
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.className} ${Inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Meta />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8fdd1ded-7977-4c72-980e-8374b3223878"
        />
      </head>
      <body className={`antialiased`} suppressHydrationWarning>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
