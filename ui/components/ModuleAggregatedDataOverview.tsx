import { Box, DataTable, Text } from "grommet";
import { DataModule } from "../types/dataModule";
import axios from "axios";
import { useState, Fragment, useEffect } from "react";

const ModuleAggregatedDataOverview = ({
  module,
  mapping
}: {
  module: DataModule;
  mapping: {
    properties: { [field: string]: { type: string } };
  };
}) => {
  const [moduleData, setModuleData] = useState<object[]>([]);

  const getModuleData = async (start?: number) => {
    const responseGetModuleData = await axios.get(
      process.env.NODE_ENV === "development"
        ? `${process.env.STORE_SERVICE_DEV}/query/all?moduleId=${
            module.id
          }&start=${start ? start : 0}`
        : `${process.env.STORE_SERVICE_PROD}/query/all?moduleId=${
            module.id
          }&start=${start ? start : 0}`
    );

    setModuleData([...moduleData, ...responseGetModuleData.data.data]);
  };

  useEffect(() => {
    getModuleData();
  }, [module]);

  return (
    <Fragment>
      {moduleData.length > 0 ? (
        <Box pad="medium">
          <DataTable
            step={10}
            resizeable
            sortable
            onMore={() => getModuleData(moduleData.length)}
            primaryKey="key"
            columns={Object.keys(mapping.properties).map((field, index) => {
              return {
                key: index,
                property: field,
                header: <Text>{field}</Text>,
                search: true
              };
            })}
            data={moduleData.map((item, index) => {
              return { ...item, key: index };
            })}
          />
        </Box>
      ) : (
        <Box pad="medium">
          <Text>No data available</Text>
        </Box>
      )}
    </Fragment>
  );
};

export default ModuleAggregatedDataOverview;
