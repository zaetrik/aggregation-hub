import { Fragment } from "react";
import theme from "../theme";

export default ({
  title,
  children,
  containerStyle,
  onClick
}: {
  title: string;
  onClick?: any;
  children?: any;
  containerStyle?: { [style: string]: string };
}) => {
  return (
    <Fragment>
      <div className="card-container" style={containerStyle}>
        <header
          className="cursor-pointer"
          onClick={e => {
            if (onClick) onClick(e);
          }}
        >
          {title}
        </header>
        {children ? <div className="card-content">{children}</div> : null}
      </div>
      <style jsx>{`
        .card-container {
          ${theme.hoverOut}
          display: block;
          position: relative;
          margin-bottom: 25px;
          padding: 1rem 1.5rem;
          background: hsla(0, 0%, 100%, 0.33);
          ${theme.borderRadius}
          box-shadow: 0 23px 20px -20px rgba(153, 166, 177, 0.1),
            0 0 15px rgba(153, 166, 177, 0.06);
        }

        header {
          ${theme.paddingSmall}
          ${theme.fonts.large}
        }

        .card-container:hover {
          ${theme.hoverIn}
        }

        .card-content {
          margin-top: 1rem;
        }
      `}</style>
    </Fragment>
  );
};
