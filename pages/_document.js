import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
          ></link>
          <link rel="stylesheet" href="/styles/style.css" />
          <link rel="stylesheet" href="/styles/account.css" />
          <link rel="stylesheet" href="/styles/bootstrap.min.css" />
          <link rel="stylesheet" href="/styles/globals.css" />
          <link rel="stylesheet" href="/styles/Home.module.css" />
          <link rel="stylesheet" href="/styles/plugins.css" />
          <link rel="stylesheet" href="/styles/responsive.css" />
          <link rel="stylesheet" href="/styles/shop.css" />
        </Head>
        <div
          id="modalOverly"
          style={{ height: "5471px", display: "none" }}
        ></div>
        <body className="template-index belle template-index-belle">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
