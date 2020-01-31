import { Fragment, useState, useEffect } from "react";
import axios from "axios";

// Types
import { DataModule } from "../types/dataModule";
import theme from "../theme";

export default ({ module }: { module: DataModule }) => {
  const [count, setCount] = useState<number>(0);

  const getDocumentCount = async () => {
    const responseDocumentCount = await axios.get(
      process.env.NODE_ENV === "development"
        ? `${process.env.STORE_SERVICE_DEV}/index/count/${module.id}`
        : `${process.env.STORE_SERVICE_PROD}/index/count/${module.id}`
    );

    setCount(responseDocumentCount.data.count);
  };

  useEffect(() => {
    getDocumentCount();
    const interval = setInterval(async () => {
      await getDocumentCount();
    }, 5000);

    return () => clearInterval(interval);
  }, [module]);
  return (
    <Fragment>
      <span>{count}</span>
      <style jsx>{`
        span {
          ${theme.fonts.large}
        }
      `}</style>
    </Fragment>
  );
};
