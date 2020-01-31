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

// Types
import { DataModule } from "../types/dataModule";

export default ({ module }: { module: DataModule }) => {
  return module.config ? (
    <Fragment>
      <Heading size="large" fontWeight={200}>
        Module
      </Heading>
      <ModuleDocumentCount
        containerStyle={{
          paddingLeft: theme.margin.small,
          marginBottom: theme.margin.medium
        }}
        module={module}
      />
      <AccordionPanel title="Description" open={true}>
        <Heading size="medium">{module.config.description}</Heading>
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
            <FaDatabase size={20} style={{ paddingRight: "20px" }} />
            Example Data
          </Fragment>
        }
      >
        <ModuleDataExample module={module} />
      </AccordionPanel>
    </Fragment>
  ) : null;
};
