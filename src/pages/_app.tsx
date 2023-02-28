// import "react-markdown-editor-lite/lib/index.css";
import "@/styles/globals.css";
import "@/styles/editor.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { UIProvider } from "@/providers/UIprovider";
import { ThemeProvider } from "next-themes";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {getLayout(
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <UIProvider>
              <Component {...pageProps} />
            </UIProvider>
          </Hydrate>
        </QueryClientProvider>
      )}
    </ThemeProvider>
  );
}
