import type { MetadataRoute } from "next";
import { brand } from "@/src/shared/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.productName} | مدیریت ورزش`,
    short_name: brand.productName,
    description: "پلتفرم یکپارچه مدیریت ورزش تادنا",
    start_url: "/register",
    display: "standalone",
    background_color: "#F4F0E8",
    theme_color: "#0B1F33",
    lang: "fa",
    dir: "rtl",
  };
}
