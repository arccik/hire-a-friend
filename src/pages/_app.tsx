import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { api } from "~/utils/api";

import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "~/helpers/Analytics";

const meta = [
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1, maximum-scale=1",
  },
  {
    name: "description",
    content:
      "The platform helps creating meaningful connections and financial opportunities",
  },
  {
    name: "title",
    content:
      "Rent My Time | Companionship, a listening ear, or a way to earn extra income",
  },
];

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Head>
          {meta.map((meta) => (
            <meta key={meta.name} {...meta} />
          ))}

          <title>{meta.at(-1)?.content}</title>
        </Head>
        {/* google analytics */}
        <Analytics />
        <Header />
        <Component {...pageProps} />

        <ToastContainer
          position="top-right"
          newestOnTop={false}
          // theme="colored"
          draggable
        />
        <Footer />
      </SessionProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
