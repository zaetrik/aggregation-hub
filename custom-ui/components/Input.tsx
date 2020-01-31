import { Fragment } from "react";
import theme from "../theme";

export default ({
  label,
  onChange,
  type,
  placeholder,
  containerStyle
}: {
  placeholder?: string;
  label?: string;
  onChange?: any;
  type?: string;
  containerStyle?: { [style: string]: string };
}) => {
  return (
    <Fragment>
      <div style={containerStyle}>
        <label>
          {label}
          <input
            placeholder={placeholder ? placeholder : ""}
            type={type ? type : "text"}
            onChange={e => {
              if (onChange) onChange(e);
            }}
          />
        </label>
      </div>
      <style jsx>{`
        div {
          display: flex;
          width: 100%;
        }

        input {
          ${theme.paddingSmall}
          margin-top: 5px;
          outline: none;
          border: none;
          ${theme.borderRadius}
          width: fill-available;
        }

        label {
          ${theme.marginSmall}
          width: inherit;
          display: flex;
          flex-flow: column;
        }
      `}</style>
    </Fragment>
  );
};
