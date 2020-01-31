import { Fragment, useState } from "react";
import theme from "../theme";

// Components
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

export default (props: {
  open?: boolean;
  children?: JSX.Element;
  title?: JSX.Element | string;
  containerStyle?: { [style: string]: string };
}) => {
  const [open, setOpen] = useState<boolean>(props.open ? props.open : false);

  return (
    <Fragment>
      <div style={props.containerStyle} className="accordion-panel-container">
        <header className="cursor-pointer" onClick={e => setOpen(!open)}>
          {open ? (
            <FaAngleDown size={18} style={{ marginRight: "10px" }} />
          ) : (
            <FaAngleRight size={18} style={{ marginRight: "10px" }} />
          )}
          {props.title}
        </header>
        <div
          className={
            open
              ? "accordion-content accordion-panel-open"
              : "accordion-panel-closed"
          }
        >
          {props.children}
        </div>
      </div>
      <style jsx>{`
        .accordion-panel-container {
          border-bottom: 1px solid ${theme.colors.hoverColor};
        }

        .accordion-panel-open {
          max-height: 500px; 
        }

        .accordion-panel-closed {
          display: none;
          max-height: 0;
        }

        .accordion-content {
          ${theme.paddingMedium}
        }

        header {
          display: flex;
          ${theme.borderRadius}
          ${theme.paddingMedium}
          ${theme.hoverOut}
          ${theme.fonts.large}
        }

        header:hover {
          ${theme.hoverIn}
        }
      `}</style>
    </Fragment>
  );
};
