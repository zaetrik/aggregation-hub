import { Fragment } from "react";
import theme from "../theme";

// Components
import Text from "./Text";

export default ({
  type,
  onClick,
  title,
  icon,
  containerStyle,
  active
}: {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: any;
  title?: string;
  icon?: JSX.Element;
  containerStyle?: { [style: string]: string };
}) => {
  return (
    <Fragment>
      <button
        disabled={active ? !active : false}
        type={type ? type : "button"}
        style={containerStyle}
        onClick={e => {
          if (onClick) onClick(e);
        }}
      >
        <span className="icon">{icon}</span>
        <Text size="small">{title}</Text>
      </button>
      <style jsx>{`
        .icon {
          font-size: ${theme.fonts.medium};
          padding: 0 ${theme.padding.small};
        }

        button {
          font-size: 100%;
          border: 0;
          font-family: inherit;
          padding: ${theme.padding.small};
          ${theme.borderRadius}
          ${theme.hoverOut}
          border: 1px solid transparent;
        }

        button:hover {
          ${theme.hoverIn}
          ${theme.border}
        }
      `}</style>
    </Fragment>
  );
};
