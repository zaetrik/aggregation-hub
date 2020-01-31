import { Fragment, ButtonHTMLAttributes } from "react";
import theme from "../theme";

export default ({
  type,
  onClick,
  title,
  icon,
  containerStyle
}: {
  type?: "button" | "submit" | "reset";
  onClick?: any;
  title?: string;
  icon?: JSX.Element;
  containerStyle?: { [style: string]: string };
}) => {
  return (
    <Fragment>
      <button
        type={type ? type : "button"}
        style={containerStyle}
        onClick={e => {
          if (onClick) onClick(e);
        }}
      >
        <span className="icon">{icon}</span>
        <span>{title}</span>
      </button>
      <style jsx>{`
        .icon {
          font-size: 15px;
          padding: 0 5px;
        }

        button {
          font-size: 100%;
          border: 0;
          font-family: inherit;
          ${theme.paddingSmall}
          ${theme.borderRadius}
          ${theme.hoverOut}
          border: 1px solid transparent;
        }

        button:hover {
            ${theme.hoverIn}
            ${theme.border}
            font-weight: bold;
        }
      `}</style>
    </Fragment>
  );
};
