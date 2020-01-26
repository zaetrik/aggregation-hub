import { DataModule } from "../types/dataModule";
import { Box, Heading, Accordion, AccordionPanel } from "grommet";
import ModuleAggregationSettings from "./ModuleAggregationSettings";
import ModuleDescription from "./ModuleDescription";
import ModuleDocumentCount from "./ModuleDocumentCount";
import ModuleMappingOverview from "./ModuleMappingOverview";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import ModuleAggregatedDataOverview from "./ModuleAggregatedDataOverview";
import axios from "axios";
import * as Icons from "grommet-icons";

const ModuleOverview = ({
  module,
  setModuleState
}: {
  module: DataModule;
  setModuleState: Dispatch<SetStateAction<DataModule>>;
}) => {
  const [mapping, setMapping] = useState<{
    properties: { [field: string]: { type: string } };
  }>({ properties: {} });

  useEffect(() => {
    const interval = setInterval(async () => {
      const responseModule = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/modules/id/${module.id}`
          : `${process.env.MODULES_SERVICE_PROD}/modules/id/${module.id}`
      );
      setModuleState(responseModule.data.modules[0]);
    }, 5000);

    return () => clearInterval(interval);
  }, [module]);

  return (
    <Box pad="small">
      <Heading size="xxsmall">Module</Heading>
      <Accordion>
        <AccordionPanel label="Description">
          <ModuleDescription module={module} />
        </AccordionPanel>
        <AccordionPanel label="Settings">
          {Object.keys(module.config.routes).filter(
            route =>
              Object.keys(module.config.routes[route].body).length > 0 ||
              Object.keys(module.config.routes[route].query).length > 0
          ).length > 0 ? (
            <ModuleAggregationSettings module={module} />
          ) : null}
        </AccordionPanel>
        <AccordionPanel label="Mapping">
          {" "}
          <ModuleMappingOverview
            module={module}
            mapping={mapping}
            setMapping={setMapping}
          />
        </AccordionPanel>
        <AccordionPanel
          label={
            <Box direction="row" style={{ paddingLeft: "6px" }}>
              <Heading level="4">Data</Heading>
              <Box justify="center" style={{ paddingLeft: "24px" }}>
                <Icons.LinkNext />
              </Box>
              <ModuleDocumentCount module={module} />
            </Box>
          }
        >
          <ModuleAggregatedDataOverview mapping={mapping} module={module} />
        </AccordionPanel>
      </Accordion>
    </Box>
  );
};

export default ModuleOverview;
