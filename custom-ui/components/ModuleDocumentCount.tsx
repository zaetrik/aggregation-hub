import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Text from "./Text";

// Types
import { DataModule } from "../types/dataModule";

export default ({
  module,
  containerStyle
}: {
  module: DataModule;
  containerStyle?: { [style: string]: string };
}) => {
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
    <div style={containerStyle ? containerStyle : {}}>
      <Text size="large" padding="xsmall" margin="none">
        {count} Documents Aggregated
      </Text>
    </div>
  );
};
