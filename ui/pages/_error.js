import React from "react";
import Layout from "../components/Layout";
import { Heading } from "grommet";

function Error({ statusCode }) {
  return (
    <Layout>
      <Heading textAlign="center" alignSelf="center">
        Oops! Sorry!
        <br />
        An error occurred.
      </Heading>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
