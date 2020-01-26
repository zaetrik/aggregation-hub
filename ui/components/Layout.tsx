import { Fragment } from "react";
import Headers from "./Header";
import Head from "next/head";
import Footer from "./Footer";
import { ResponsiveContext, Box, Grid } from "grommet";

const Layout = (props): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Aggregation Hub</title>
        <meta name="description" content="Aggregation Hub" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#000"></meta>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link rel="stylesheet" href="/css/main.css" />
      </Head>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid
            rows={["min-content", "auto", "min-content"]}
            columns={["auto"]}
            fill="horizontal"
            style={{ minHeight: "100%" }}
            // gap="small"
            areas={[
              { name: "header", start: [0, 0], end: [0, 0] },
              { name: "main", start: [0, 1], end: [0, 1] },
              { name: "footer", start: [0, 2], end: [0, 2] }
            ]}
          >
            <Box gridArea="header" background="brand">
              <Headers></Headers>
            </Box>
            <Box gridArea="main" background="light-1">
              {props.children}
            </Box>
            <Box gridArea="footer" justify="end" background="light-3">
              <Footer></Footer>
            </Box>
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Fragment>
  );
};

export default Layout;
