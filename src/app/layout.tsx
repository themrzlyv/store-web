import type { Metadata } from "next";
import { Manrope } from "@/styles/fonts";
import { MainProviders } from "@/shared/providers/main-providers";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

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
    <html lang="en" className={`${Manrope.variable}`} suppressHydrationWarning>
      {/* <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8fdd1ded-7977-4c72-980e-8374b3223878"
        ></script>
      </head> */}
      <body className={`antialiased`} suppressHydrationWarning>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
