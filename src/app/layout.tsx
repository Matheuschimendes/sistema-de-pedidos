import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CardProvider } from "./[slug]/menu/context/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Comanda Facil",
  description: "App de gerenciamento de comandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <CardProvider>
          {children}
        </CardProvider>
      </body>
    </html>
  );
}
