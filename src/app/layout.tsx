import "./globals.css";

export const metadata = {
  title: "Bridge",
  description: "Seong-il's Next.js portfolio",
  openGraph: {
    title: "Bridge",
    description: "여기를 눌러 링크를 확인하세요.",
    url: "https://bridge-vert.vercel.app/",
    siteName: "Bridge",
    images: [
      {
        url: "/Bridge/thumbnail.png", // public 폴더 기준 경로
        width: 1200,
        height: 630,
        alt: "Bridge 썸네일",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge",
    description: "여기를 눌러 링크를 확인하세요.",
    images: ["/Bridge/thumbnail.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
