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
      <body className={`antialiased`} suppressHydrationWarning>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
