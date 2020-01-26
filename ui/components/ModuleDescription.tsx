import { Fragment } from "react";
import { Box, Text } from "grommet";
import * as Icons from "grommet-icons";
import { DataModule } from "../types/dataModule";
import ModuleRoutesDescription from "./ModuleRoutesDescription";

const ModuleDescription = ({ module }: { module: DataModule }) => {
  const showModuleRouteSettings = false;

  return (
    <Fragment>
      <Box direction="row" pad="medium">
        <Icons.Info style={{ marginRight: "10px" }}></Icons.Info>
        <Text>{module.config.description}</Text>
      </Box>
      {showModuleRouteSettings ? (
        <ModuleRoutesDescription module={module} />
      ) : null}
    </Fragment>
  );
};

export default ModuleDescription;
