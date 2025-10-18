import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { WebHeader } from "@/components/Headers/WebHeader";
import { theme } from "@/theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAPL"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}><WebHeader />{children}</MantineProvider>
      </body>
    </html>
  );
}
