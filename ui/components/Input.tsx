import { Fragment } from "react";
import theme from "../theme";

export default ({
  label,
  value,
  onChange,
  type,
  placeholder,
  containerStyle
}: {
  value?: string | number;
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
            value={value ? value : ""}
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
          padding: ${theme.padding.small};
          margin-top: ${theme.margin.small};
          outline: none;
          border: none;
          ${theme.borderRadius}
          width: fill-available;
        }

        label {
          margin: ${theme.margin.small};
          width: inherit;
          display: flex;
          flex-flow: column;
        }
      `}</style>
    </Fragment>
  );
};
