import { Raleway, Inter as InterGoogle } from "next/font/google"

export const JosefinSans = Raleway({
  variable: "--font-poppins",
  adjustFontFallback: true,
  display: "optional",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const Inter = InterGoogle({
  variable: "--font-inter",
  display: "optional",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
