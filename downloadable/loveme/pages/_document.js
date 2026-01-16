import Document, { Html, Head, Main, NextScript } from 'next/document'

// Base path for GitHub Pages - fallback to /Highmark for production
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/Highmark';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href={`${basePath}/images/boris/HighmarkLogo.PNG`} />
          <link rel="apple-touch-icon" href={`${basePath}/images/boris/HighmarkLogo.PNG`} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
