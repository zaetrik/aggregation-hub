import { Fragment, useEffect, useState } from "react";
import { getMapping } from "../loaders/store";

// Components
import BasicTable from "./BasicTable";
import Text from "./Text";

// Types
import { DataModule } from "../types/dataModule";

export default ({ module }: { module: DataModule }) => {
  const [mapping, setMapping] = useState<{
    properties: { [field: string]: { type: string } };
  }>({ properties: {} });

  const [data, setData] = useState<{ field: string; type: string }[]>([]);

  useEffect(() => {
    getMapping(module.id).then(response => {
      setMapping(response.data.mapping);
    });
  }, [module]);

  useEffect(() => {
    setData(
      Object.keys(mapping.properties).map(field => {
        return { field: field, type: mapping.properties[field].type };
      })
    );
  }, [mapping]);

  const columns = [
    { Header: "Field", accessor: "field" },
    { Header: "Type", accessor: "type" }
  ];

  return (
    <Fragment>
      {Object.keys(mapping.properties).length > 0 ? (
        <BasicTable data={data} columns={columns} />
      ) : (
        <Text>No mapping available</Text>
      )}
    </Fragment>
  );
};
