import "./globals.css";

export const metadata = {
  title: "Bridge",
  description: "Seong-il’s Next.js portfolio",
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
