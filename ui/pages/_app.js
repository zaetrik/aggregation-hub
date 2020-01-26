import React from "react";
import App from "next/app";
import { Grommet } from "grommet";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    const theme = {
      rounding: 12,
      spacing: 24,
      global: {
        colors: {},
        font: {
          family: '"Work Sans"',
          face:
            "/* latin-ext */\n@font-face {\n  font-family: 'Work Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Work Sans'), local('WorkSans-Regular'), url(https://fonts.gstatic.com/s/worksans/v5/QGYsz_wNahGAdqQ43Rh_cqDptfpA4cD3.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Work Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Work Sans'), local('WorkSans-Regular'), url(https://fonts.gstatic.com/s/worksans/v5/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
          size: "15px",
          height: "20px",
          maxWidth: "300px"
        }
      }
    };

    return (
      <Grommet full theme={theme}>
        <Component {...pageProps} />
      </Grommet>
    );
  }
}

export default MyApp;
