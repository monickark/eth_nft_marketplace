import Header from "./Header";
import Footer from "./Footer";

import Head from "next/head";

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
            : "World Wide Tournaments"}
        </title>
        <meta
          name="description"
          key="description"
          content={
            description
              ? description
              : "World Wide Tournaments"
          }
        />
        <meta
          property="og:title"
          content={
            title
              ? title
              : "World Wide Tournaments"
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
              : "World Wide Tournaments"
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
