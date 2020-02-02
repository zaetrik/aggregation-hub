import { Fragment } from "react";
import theme from "../theme";

export default (props: {
  children?: any;
  onClick?: any;
  className?: string;
  margin?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge";
  padding?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge";
  size?:
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge";
  style?: { [style: string]: string };
}) => {
  const getPadding = () => {
    switch (props.padding) {
      case "none":
        return "0px";
      case "xxsmall":
        return theme.padding.xxsmall;
      case "xsmall":
        return theme.padding.xsmall;
      case "small":
        return theme.padding.small;
      case "medium":
        return theme.padding.medium;
      case "large":
        return theme.padding.large;
      case "xlarge":
        return theme.padding.xlarge;
      case "xxlarge":
        return theme.padding.xxlarge;
      default:
        return theme.padding.medium;
    }
  };

  const getMargin = () => {
    switch (props.margin) {
      case "none":
        return "0px";
      case "xxsmall":
        return theme.margin.xxsmall;
      case "xsmall":
        return theme.margin.xsmall;
      case "small":
        return theme.margin.small;
      case "medium":
        return theme.margin.medium;
      case "large":
        return theme.margin.large;
      case "xlarge":
        return theme.margin.xlarge;
      case "xxlarge":
        return theme.margin.xxlarge;
      default:
        return theme.margin.medium;
    }
  };

  return (
    <Fragment>
      <div
        className={props.className ? props.className : ""}
        onClick={props.onClick ? e => props.onClick(e) : e => {}}
        style={{
          ...props.style
        }}
      >
        {props.children}
      </div>
      <style jsx>{`
        div {
          margin: ${getMargin()};
          padding: ${getPadding()};
        }
      `}</style>
    </Fragment>
  );
};
