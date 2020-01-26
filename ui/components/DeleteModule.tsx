import { Button } from "grommet";
import axios from "axios";
import { DataModule } from "../types/dataModule";
import { Dispatch, SetStateAction } from "react";
import * as Icons from "grommet-icons";

const DeleteModule = ({
  modules,
  module,
  setModulesState
}: {
  modules: DataModule[];
  module: DataModule;
  setModulesState: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const deleteModule = async moduleId => {
    await axios.delete(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/modules/id/${moduleId}`
        : `${process.env.MODULES_SERVICE_PROD}/modules/id/${moduleId}`
    );

    const newModules = modules.filter(item => item.id !== moduleId);
    setModulesState(newModules);
  };

  return (
    <Button
      alignSelf="start"
      margin="small"
      icon={<Icons.Trash />}
      label="Remove"
      hoverIndicator
      onClick={() => deleteModule(module.id)}
    ></Button>
  );
};

export default DeleteModule;
