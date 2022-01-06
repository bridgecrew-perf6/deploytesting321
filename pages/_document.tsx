import Document, { Html, Head, Main, NextScript } from "next/document";
import configs from "../endpoints.config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href="https://res.cloudinary.com/rahmad12/image/upload/v1630082235/PoldIt/App_Imgs/iconified/favicon_qxxxlw.ico"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body style={{ overflowY: "auto" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
