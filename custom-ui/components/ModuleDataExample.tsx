import { Fragment, useState, useEffect } from "react";
import { getModuleDataFromStore } from "../loaders/store";

// Components
import BasicTable from "./BasicTable";
import Text from "./Text";

// Types
import { DataModule } from "../types/dataModule";

export default ({ module }: { module: DataModule }) => {
  const [moduleData, setModuleData] = useState<object[]>([]);
  const [columns, setColumns] = useState<
    { Header: string; accessor: string }[]
  >([]);

  const getModuleData = async (start?: number) => {
    const responseGetModuleData = await getModuleDataFromStore(
      module.id,
      start ? start : 0
    );

    setModuleData(responseGetModuleData.data.data);
  };

  const getColumns = (): { Header: string; accessor: string }[] => {
    return Object.keys(moduleData[0]).map(column => {
      return { Header: column, accessor: column };
    });
  };

  useEffect(() => {
    getModuleData();
  }, [module]);

  return (
    <Fragment>
      {moduleData.length > 0 ? (
        <BasicTable columns={getColumns()} data={moduleData} />
      ) : (
        <Text>No data available</Text>
      )}
    </Fragment>
  );
};
