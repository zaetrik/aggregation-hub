import theme from "../theme";
import { Fragment } from "react";

export default (props: {
  children: any;
  className?: string;
  onClick?: any;
  textAlign?: "left" | "right" | "center" | "inherit";
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
  containerStyle?: { [style: string]: string };
  fontWeight?: any | string;
}) => {
  const getFontSize = () => {
    switch (props.size) {
      case "xxsmall":
        return theme.fonts.xxsmall;
      case "xsmall":
        return theme.fonts.xsmall;
      case "small":
        return theme.fonts.small;
      case "medium":
        return theme.fonts.medium;
      case "large":
        return theme.fonts.large;
      case "xlarge":
        return theme.fonts.xlarge;
      case "xxlarge":
        return theme.fonts.xxlarge;
      default:
        return theme.fonts.medium;
    }
  };

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
        return theme.padding.small;
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
        return theme.margin.small;
    }
  };

  return (
    <Fragment>
      <span
        className={props.className ? props.className : ""}
        onClick={props.onClick ? props.onClick : e => {}}
        style={{
          ...props.containerStyle
        }}
      >
        {props.children}
      </span>
      <style jsx>{`
        span {
          font-size: ${getFontSize()};
          margin: ${getMargin()};
          padding: ${getPadding()};
          text-align: ${props.textAlign ? props.textAlign : "left"};
          font-weight: ${props.fontWeight ? props.fontWeight : "inherit"};
        }
      `}</style>
    </Fragment>
  );
};
