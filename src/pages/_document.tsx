import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="light">
      <Head>
        <body>
          <Main />
          <NextScript />
          {/* For google analytics  | open issue on github */}
          <script> </script>
        </body>
      </Head>
    </Html>
  );
}
