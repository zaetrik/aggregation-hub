import { Fragment } from "react";
import theme from "../theme";

// Components
import Heading from "./Heading";

export default ({
  title,
  children,
  containerStyle,
  onClick,
  subHeading,
  alignContent,
  justifyContent,
  hover
}: {
  alignContent?: "start" | "center" | "end";
  justifyContent?: "start" | "center" | "end";
  title: string;
  onClick?: any;
  children?: any;
  containerStyle?: { [style: string]: string };
  subHeading?: string;
  hover?: boolean;
}) => {
  return (
    <Fragment>
      <div className="card-container" style={containerStyle}>
        <Heading
          subHeading={subHeading ? subHeading : undefined}
          fontWeight={200}
          size="medium"
          padding="none"
          margin="none"
          className="cursor-pointer"
          onClick={e => {
            if (onClick) onClick(e);
          }}
        >
          {title}
        </Heading>
        {children ? <div className="card-content">{children}</div> : null}
      </div>
      <style jsx>{`
        .card-container {
          ${theme.hoverOut}
          display: block;
          position: relative;
          margin-bottom: ${theme.margin.xlarge};
          padding: ${theme.padding.medium} ${theme.padding.large};
          background: #fff;
          ${theme.borderRadius}
          ${theme.boxShadow}
        }

        ${hover === true || hover === undefined
          ? `.card-container:hover {
          ${theme.hoverIn}
        }`
          : ""}

        .card-content {
          margin-top: ${theme.margin.medium};
          ${justifyContent
            ? `display: flex; justify-content: ${justifyContent};`
            : ""}
          ${alignContent
            ? `display: flex; align-content: ${alignContent};`
            : ""}
        }
      `}</style>
    </Fragment>
  );
};
