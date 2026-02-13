import type { NextConfig } from "next";

const repo = "portfolio";

/**
 * DEPLOY_TARGET
 * - "gh-pages": github pages용 정적 export
 * - (그 외/미설정): vercel(또는 일반 서버)용
 */
const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = isGhPages
  ? {
      // ✅ GitHub Pages (정적)
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },

      // GitHub Pages는 보통 https://<user>.github.io/<repo>/ 형태라 basePath 필요
      basePath: `/${repo}`,

      // 정적 자산 경로까지 확실히 맞추고 싶으면 assetPrefix도 같이
      assetPrefix: `/${repo}/`,
    }
  : {
      // ✅ Vercel (풀스택)
      // export/basePath/trailingSlash 강제 X
      // API route(app/api/*) 포함해서 정상 동작
    };

export default nextConfig;
