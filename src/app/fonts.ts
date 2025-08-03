import { Inter, Roboto_Slab, Poppins } from "next/font/google"

export const inter = Inter({ subsets: ["latin"] })

export const roboto_slab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab"
})

export const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins"
})
