import { Fragment, useState } from "react";
import theme from "../theme";

// Components
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Heading from "./Heading";
import Icon from "./Icon";

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
        <div className="header" onClick={e => setOpen(!open)}>
          <Heading padding="medium" className="cursor-pointer" fontWeight={200}>
            <Icon
              size={theme.fonts.medium.split("px")[0]}
              icon={open ? <FaAngleDown /> : <FaAngleRight />}
            />
            {props.title}
          </Heading>
        </div>
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
          padding: ${theme.padding.medium};
        }

        .header {
          display: flex;
          ${theme.borderRadius}
          ${theme.hoverOut}
        }

        .header:hover {
          ${theme.hoverIn}
        }
      `}</style>
    </Fragment>
  );
};
