import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
