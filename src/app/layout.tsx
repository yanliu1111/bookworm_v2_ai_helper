import "./globals.css";
import { Inter } from "next/font/google";
import Chat from "@/components/Chat";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookworm",
  description:
    "Your next favorite book is waiting for you, start your fantasy & mystery journey now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  );
}
