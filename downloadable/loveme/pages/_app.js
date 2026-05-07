import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import '../styles/sass/style.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/index";
import { Provider } from "react-redux";
import 'photoswipe/dist/photoswipe.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { useEffect } from "react";
import basePath from "../utils/basePath";

function MyApp({ Component, pageProps }) {
  const siteTitle = "Highmark Event Rentals - Chairs, Tables, Linens & Tenting";

  // Set CSS variable for base path so SCSS can use it for background images
  useEffect(() => {
    document.documentElement.style.setProperty('--base-path', `"${basePath}"`);
  }, []);

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta name="application-name" content={siteTitle} />
        <meta name="apple-mobile-web-app-title" content="Highmark Event Rentals" />
        <meta name="description" content="Highmark Event Rentals provides chairs, tables, linens, tenting, and event rental support across the Bay Area and beyond." />
        <meta property="og:site_name" content="Highmark Event Rentals" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content="Chairs, tables, linens, tenting, and event rentals for weddings, corporate events, private parties, and celebrations." />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content="Chairs, tables, linens, tenting, and event rentals for weddings, corporate events, private parties, and celebrations." />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>

  )
}

export default MyApp
