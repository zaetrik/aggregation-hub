import { Box, DataTable, Text } from "grommet";
import { DataModule } from "../types/dataModule";
import axios from "axios";
import { useEffect, Fragment, Dispatch, SetStateAction } from "react";

const ModuleMappingOverview = ({
  module,
  mapping,
  setMapping
}: {
  module: DataModule;
  mapping: {
    properties: { [field: string]: { type: string } };
  };
  setMapping: Dispatch<
    SetStateAction<{
      properties: { [field: string]: { type: string } };
    }>
  >;
}) => {
  useEffect(() => {
    axios
      .get(
        process.env.NODE_ENV === "development"
          ? `${process.env.STORE_SERVICE_DEV}/index/mapping/${module.id}`
          : `${process.env.STORE_SERVICE_PROD}/index/mapping/${module.id}`
      )
      .then(response => setMapping(response.data.mapping));
  }, [module]);

  return (
    <Fragment>
      {Object.keys(mapping.properties).length > 0 ? (
        <Box pad="medium">
          <DataTable
            resizeable
            sortable
            columns={[
              {
                property: "field",
                header: <Text>Field</Text>,
                primary: true,
                search: true
              },
              {
                property: "type",
                header: "Type",
                search: true,
                render: datum => <Text>{datum.type}</Text>
              }
            ]}
            data={Object.keys(mapping.properties).map(field => {
              return { field: field, type: mapping.properties[field].type };
            })}
          />
        </Box>
      ) : (
        <Box pad="medium">
          <Text>No mapping available</Text>
        </Box>
      )}
    </Fragment>
  );
};

export default ModuleMappingOverview;
