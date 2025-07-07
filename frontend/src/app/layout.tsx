import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar/Navbar";
import fetchContentType from "../../lib/strapi/fetchContentType";
import Footer from "./components/Footer";
import { generateMetadataObject } from "../../lib/shared/metadata";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const pageData = await fetchContentType(
    "global",
    `&populate=seo.metaImage`,
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageData = await fetchContentType("global", "", true);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar
          logo={pageData.Logo}
          navRHS={pageData.NavigationBar.NavRHS}
          items={pageData.NavigationBar.items}
        />
        <main className="">{children}</main>
        <Footer FooterNavItems={pageData.FooterNavItems} />
        <Script
          src="https://launchers.bonb.io/support.js?id=eINYzEDUo6"
          defer
        ></Script>
      </body>
    </html>
  );
}
