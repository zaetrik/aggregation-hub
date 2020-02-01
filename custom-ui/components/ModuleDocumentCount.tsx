import { useState, useEffect } from "react";
import { getDocumentCount } from "../loaders/store";

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

  const getDocumentCountForModule = async () => {
    const responseDocumentCount = await getDocumentCount(module.id);

    setCount(responseDocumentCount.data.count);
  };

  useEffect(() => {
    getDocumentCountForModule();
    const interval = setInterval(async () => {
      await getDocumentCountForModule();
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
