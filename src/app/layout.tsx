import "@/app/globals.css";

import { Familjen_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Providers  from "@/components/Providers";
import Navbar from "@/components/Navbar";

const grotesk = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "DigitalOctopus",
  description: "DigitalOctopus - marketplace for creators and artists",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          grotesk.className,
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <Providers>
          <Navbar />
          <div className="flex-1 flex-grow">
            {children}
          </div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
