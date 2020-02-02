import { Fragment } from "react";
import theme from "../theme";

export default ({
  icon,
  size,
  margin,
  padding,
  className,
  style,
  onClick
}: {
  icon: JSX.Element;
  style?: { [style: string]: string };
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
    | "xxlarge"
    | string;
  padding?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | string;
  size?:
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | number
    | string;
}) => {
  const getFontSize = () => {
    switch (size) {
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
        return size;
    }
  };

  const getPadding = () => {
    switch (padding) {
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
        return padding;
    }
  };

  const getMargin = () => {
    switch (margin) {
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
        return margin;
    }
  };

  return (
    <Fragment>
      <span
        style={style ? style : {}}
        className={className ? `${className} icon` : "icon"}
        onClick={onClick ? e => onClick(e) : e => {}}
      >
        {icon}
      </span>
      <style jsx>{`
        .icon {
          font-size: ${size ? getFontSize() : theme.fonts.medium};
          margin: ${margin ? getMargin() : `0 ${theme.margin.small} 0 0`};
          padding: ${padding ? getPadding() : "0"};
          vertical-align: middle;
        }
      `}</style>
    </Fragment>
  );
};
