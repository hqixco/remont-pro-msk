import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ремонт PRO — Ремонт квартир под ключ в Москве и МО",
  description:
    "Ремонт квартир в Москве без скрытых доплат после старта работ. Смета и сроки фиксируются в договоре, оплата по этапам после приемки выполненных работ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
