import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { brand } from "@/src/shared/config/brand";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.productName} | پلتفرم یکپارچه مدیریت ورزش`,
    template: `%s | ${brand.productName}`,
  },
  description: brand.landingBody,
  applicationName: brand.productName,
  appleWebApp: {
    capable: true,
    title: brand.productName,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A3A46",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden bg-[#f3f5f6] font-sans text-ink lg:bg-ocean">
        {children}
      </body>
    </html>
  );
}
