import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { api } from "~/utils/api";
import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
// import { hotjar } from "react-hotjar";

// import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Header from "~/components/template/Header";
import Footer from "~/components/template/Footer";

import Script from "next/script";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

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
  // useEffect(() => {
  //   hotjar.initialize(3742068, 6);
  // }, []);

  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Head>
          {meta.map((meta) => (
            <meta key={meta.name} {...meta} />
          ))}

          <title>{meta.at(-1)?.content}</title>
          {/* google analytics */}
        </Head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-196SYMT6WG" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-196SYMT6WG');
            `}
        </Script>
        <Script src="https://sdk.amazonaws.com/js/aws-sdk-2.1499.0.min.js" />
        <Header />
        <Component {...pageProps} />

        <ToastContainer
          position="bottom-center"
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
