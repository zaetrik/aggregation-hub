import { Fragment } from "react";
import theme from "../theme";

// Components
import ModuleDocumentCount from "./ModuleDocumentCount";
import AccordionPanel from "./AccordionPanel";
import ModuleAggregationSettings from "./ModuleAggregationSettings";
import ModuleMappingOverview from "./ModuleMappingOverview";
import ModuleDataExample from "./ModuleDataExample";
import { FaDatabase } from "react-icons/fa";
import Heading from "./Heading";
import Text from "./Text";
import Box from "./Box";

// Types
import { DataModule } from "../types/dataModule";

export default ({ module }: { module: DataModule }) => {
  return module.config ? (
    <Fragment>
      <Heading size="large" fontWeight={200}>
        Module
      </Heading>
      <Box>
        <ModuleDocumentCount module={module} />
      </Box>
      <Box>
        <AccordionPanel title="Description" open={true}>
          <Text size="medium">{module.config.description}</Text>
        </AccordionPanel>
        <AccordionPanel title="Settings">
          <ModuleAggregationSettings module={module} />
        </AccordionPanel>
        <AccordionPanel title="Mapping">
          <ModuleMappingOverview module={module} />
        </AccordionPanel>
        <AccordionPanel
          title={
            <Fragment>
              <FaDatabase
                size={20}
                style={{
                  paddingRight: theme.padding.medium,
                  verticalAlign: "sub"
                }}
              />
              Example Data
            </Fragment>
          }
        >
          <ModuleDataExample module={module} />
        </AccordionPanel>
      </Box>
    </Fragment>
  ) : null;
};
