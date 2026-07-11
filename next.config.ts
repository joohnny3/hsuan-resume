import type { NextConfig } from "next";

import { BASE_PATH } from "./src/lib/site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  images: {
    // GitHub Pages 是純靜態主機，沒有影像最佳化伺服器；照片已預先壓成 WebP。
    unoptimized: true,
  },
};

export default nextConfig;
