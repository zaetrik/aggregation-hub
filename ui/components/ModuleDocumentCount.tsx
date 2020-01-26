import { Box, Text } from "grommet";
import { DataModule } from "../types/dataModule";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Icons from "grommet-icons";

const ModuleDocumentCount = ({ module }: { module: DataModule }) => {
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
    <Box pad="medium" direction="row" align="center">
      <Icons.DocumentStore />
      <Text style={{ marginLeft: "10px" }}>
        <strong>{count}</strong> Documents
      </Text>
    </Box>
  );
};

export default ModuleDocumentCount;
