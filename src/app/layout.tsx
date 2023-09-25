import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keycloak with Next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
