import { SessionProvider } from "next-auth/react";
import { Card, CardBody, NextUIProvider } from "@nextui-org/react";
import { api } from "~/utils/api";
import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { ToastContainer } from "react-toastify";

import Header from "~/components/template/Header";
import Footer from "~/components/template/Footer";

import Script from "next/script";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GiTimeTrap } from "react-icons/gi";

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
  if (!session?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96 border-orange-500">
          <CardBody>
            <div className="mb-10 flex">
              <GiTimeTrap
                size="2rem"
                className="mr-2 rounded-md bg-gradient-to-tr from-pink-500 to-yellow-500 p-1 text-white shadow-lg"
              />
              <p className="font-bold text-inherit">Rent My Time</p>
            </div>
            <p>
              Please note that our website is currently{" "}
              <b className="underline"> under construction</b>, but we&apos;re
              working hard to bring you an enhanced and exciting experience.
              <br /> Thank you for your patience!
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }
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
        <Script
          id="hotjar-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3742068,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
            `,
          }}
        />
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
