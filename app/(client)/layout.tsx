import type { Metadata } from "next";
import "@fontsource/lilita-one/latin-400.css";
import "@fontsource/vt323/latin-400.css";
import "@fontsource/fira-code/latin-400.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "../utils/Provider";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";

export const metadata: Metadata = {
  metadataBase: new URL("https://aui-blogo.vercel.app/"),
  // title: "Dev Blook - A blog for developers",
  title: {
    default: "AUI | Blogo - A blog for developers",
    template: "%s | AUI | Blogo - A blog for developers",
  },
  description: "A blog for developers by developers!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AUI | Blogo - A blog for developers",
    description: "A blog for developers by developers!",
    type: "website",
    locale: "en_US",
    url: "https://aui-blogo.vercel.app/",
    siteName: "AUIBlogo",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUI | Blogo - A blog for developers",
    description: "A blog for developers by developers!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-code h-full bg-amber-50 text-indigo-950 dark:bg-slate-950 dark:text-amber-50 selection:bg-purple-500 selection:text-amber-50 dark:selection:bg-purple-500 dark:selection:text-amber-50">
        <Provider>
          <Navbar />
          <main className="h-full mx-auto max-w-5xl px-6">{children}</main>
          <Footer />
          <FloatingButtons />
        </Provider>
      </body>
    </html>
  );
}
