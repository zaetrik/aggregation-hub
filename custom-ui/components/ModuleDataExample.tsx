import { Fragment, useState, useEffect } from "react";
import axios from "axios";

// Types
import { DataModule } from "../types/dataModule";

// Components
import BasicTable from "./BasicTable";

export default ({ module }: { module: DataModule }) => {
  const [moduleData, setModuleData] = useState<object[]>([]);
  const [columns, setColumns] = useState<
    { Header: string; accessor: string }[]
  >([]);

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
        <h1>No data available</h1>
      )}
    </Fragment>
  );
};
