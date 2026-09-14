import CmsNavbar from "../components/CmsNavbar";
import { Provider } from "../utils/Provider";
import { AdminThemeSync } from "../utils/AdminThemeSync";
import "@fontsource/lilita-one/latin-400.css";
import "@fontsource/fira-code/latin-400.css";
import "./globals.css";

export const metadata = {
  title: {
    default: "AUI Blogo Studio",
    template: "%s | AUI Blogo Studio",
  },
  description: "Admin content management for AUI Blogo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-amber-50 dark:bg-transparent text-indigo-950 dark:text-amber-50 selection:bg-purple-500 selection:text-amber-50 dark:selection:bg-purple-500 dark:selection:text-amber-50">
        <Provider>
          <AdminThemeSync />
          <CmsNavbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
