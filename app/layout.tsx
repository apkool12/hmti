import type { Metadata, Viewport } from "next";
import "./globals.css";
import EmotionRegistry from "@/lib/registry";
import { LocaleProvider } from "@/lib/i18n";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = { title: "HMTI", description: "A rural housing and settlement platform for young people" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f3f3f3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <EmotionRegistry>
          <LocaleProvider>
            <div style={{ maxWidth: 430, minHeight: "100dvh", margin: "0 auto", background: "#fff" }}>
              {children}
              <TabBar />
            </div>
          </LocaleProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
