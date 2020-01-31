import Head from "next/head";
import { Fragment } from "react";
import theme from "../theme";

// Components
import Menu from "./Menu";

const Layout = (props: {
  activeMenuItem?: string;
  children?: any;
}): JSX.Element => {
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
        <link rel="stylesheet" href="/css/main.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Assistant&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container">
        <div className="sidebar">
          <header>Aggregation Hub</header>
          <Menu activeItem={props.activeMenuItem} />
        </div>
        <div className="content">{props.children}</div>
      </div>
      <style jsx>
        {`
          .sidebar {
            width: 15%;
            min-width: 150px;
            max-width: 200px;
          }

          .container {
            display: flex;
            height: 100%;
            min-height: 100%;
          }

          .content {
            width: 100%;
            padding: 1em;
          }

          header {
            ${theme.paddingLarge}
            ${theme.fonts.large}
            font-weight: bold;
            text-align: center;
          }
        `}
      </style>
    </Fragment>
  );
};

export default Layout;
