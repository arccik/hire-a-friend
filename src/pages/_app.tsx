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
import { WebSocketProvider } from "~/context/websocketProvider";
import CookiesConsentBanner from "~/components/features/CookiesConsentBanner";
import Loader from "~/components/loader";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCSSLoad = () => {
      setIsLoading(false);
    };

    const cssLink = document.querySelector('link[href*="tailwind.css"]');
    if (cssLink) {
      cssLink.addEventListener("load", handleCSSLoad);
      return () => {
        cssLink.removeEventListener("load", handleCSSLoad);
      };
    } else {
      setIsLoading(false); // If there's no external CSS file, just hide the loader
    }
  }, []);
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <WebSocketProvider>
          <Head>
            {meta.map((meta) => (
              <meta key={meta.name} {...meta} />
            ))}

            <title>{meta.at(-1)?.content}</title>
          </Head>
          {/* google analytics */}
          <Analytics />
          {isLoading && <Loader />}
          <Header />

          <Component {...pageProps} />

          <ToastContainer
            position="top-right"
            newestOnTop={false}
            hideProgressBar={true}
            autoClose={2000}
            draggable
          />
          <Footer />
          <CookiesConsentBanner />
        </WebSocketProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
