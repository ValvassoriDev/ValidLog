import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/inicio",
        destination: "/",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/entrar",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
