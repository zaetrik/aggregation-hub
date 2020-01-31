import { Fragment } from "react";
import theme from "../theme";

export default ({ title }: { title: string }) => {
  return (
    <Fragment>
      <h1 className="page-title">{title}</h1>
      <style jsx>{`
        .page-title {
          ${theme.marginLarge}
          font-size: 36px;
        }

        .icon {
          display: inline-block;
          margin-right: 10px;
          font-size: 36px;
          ${theme.paddingSmall}
        }
      `}</style>
    </Fragment>
  );
};
