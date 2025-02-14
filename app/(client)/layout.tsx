import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "../utils/Provider";
import Footer from "../components/Footer";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aui-blogo.vercel.app/"),
  // title: "Dev Blook - A blog for developers",
  title: {
    default: "AUI | Blogo - A blog for developers",
    template: "%s | AUI | Blogo - A blog for developers",
  },
  description: "A blog for developers by developers!",
  openGraph: {
    title: "AUI | Blogo - A blog for developers",
    description: "A blog for developers by developers!",
    type: "website",
    locale: "en_US",
    url: "https://aui-blogo.vercel.app/",
    siteName: "AUIBlogo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} h-full bg-amber-50 text-indigo-950 dark:bg-slate-950 dark:text-amber-50 dark:selection:bg-purple-500`}
      >
        <Provider>
          <Navbar />
          <main className="h-full mx-auto max-w-5xl px-6">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
