import "@/app/globals.css";

import { Familjen_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";

const grotesk = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Najmi freelanCZera",
  description: "Najmi freelanCZera",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("anti relative h-full font-sans", grotesk.className)}>
        <main className="relative flex min-h-screen flex-col">
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </main>
      </body>
    </html>
  );
}
