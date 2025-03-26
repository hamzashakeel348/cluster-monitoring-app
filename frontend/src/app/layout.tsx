import "./globals.css";

import { Inter } from "next/font/google";

import Sidebar from "@/app/components/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Cluster Dashboard",
  description: "View performance metrics and manage snapshot policies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clusterName = "Qumulo Cluster";

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#161A23] text-white">
        <div className="flex lg:flex-row flex-col">
          <Toaster position="top-right" />

          <Sidebar name={clusterName} />
          <main className="flex-1 px-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
