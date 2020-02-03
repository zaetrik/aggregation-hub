import Head from "next/head";
import { Fragment } from "react";
import theme from "../theme";

// Components
import Menu from "./Menu";
import Heading from "./Heading";

export default (props: {
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

        <link
          href="https://fonts.googleapis.com/css?family=Assistant&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="//fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container">
        <div className="sidebar">
          <Heading
            size="large"
            fontWeight={200}
            padding="medium"
            margin="none"
            textAlign="center"
            containerStyle={{
              borderBottom: `1px solid ${theme.colors.hoverColor}`
            }}
          >
            Aggregation Hub
          </Heading>
          <Menu activeItem={props.activeMenuItem} />
        </div>
        <div className="content">{props.children}</div>
      </div>
      <style jsx>
        {`
          .sidebar {
            width: 15%;
            min-width: 200px;
            max-width: 250px;
            background: #fff;
            height: 100%;
            overflow: auto;
          }

          .container {
            display: flex;
            min-height: 100%;
            height: 100%;
            overflow: auto;
          }

          .content {
            width: 100%;
            padding: 2em;
            overflow: auto;
          }

          header {
            padding: ${theme.padding.large};
            font-size: ${theme.fonts.large};
            font-weight: bold;
            text-align: center;
          }
        `}
      </style>
    </Fragment>
  );
};
