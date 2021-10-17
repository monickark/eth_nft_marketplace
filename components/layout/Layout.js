import Header from "./Header";
import Footer from "./Footer";

import Head from "next/head";

import {siteTitle,siteDescription} from '../../config/config';

const Layout = ({ children, title, description, ogImage, url }) => {
  // website Url
  const pageUrl =
    "";
  // when you share this page on facebook you'll see this image
  const ogImg = "";
  return (
    <>
      <Head>
        <title>
          {title
            ? title
            : siteTitle}
        </title>
        <meta
          name="description"
          key="description"
          content={
            description
              ? description
              : siteDescription
          }
        />
        <meta
          property="og:title"
          content={
            title
              ? title
              : siteTitle
          }
          key="og:title"
        />
        <meta property="og:url" content={url ? url : pageUrl} key="og:url" />
        <meta
          property="og:image"
          content={ogImage ? ogImage : ogImg}
          key="og:image"
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : siteDescription
          }
          key="og:description"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx global>
        {`
          body {
            background-color: #000!important;
            overflow-x: hidden;
            padding: 0 !important;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
