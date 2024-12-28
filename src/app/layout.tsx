import type { Metadata } from "next";
import { Inter, JosefinSans } from "@/styles/fonts";
import { MainProviders } from "@/shared/providers/main-providers";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Samir Mirzaliyev",
  description: "Developed by Samir Mirzaliyev",
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
