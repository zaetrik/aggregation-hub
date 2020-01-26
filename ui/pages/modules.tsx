import Layout from "../components/Layout";
import { Box, ResponsiveContext, Accordion, AccordionPanel } from "grommet";
import axios from "axios";
import { DataModule } from "../types/dataModule";
import { useState, useEffect } from "react";
import CreateModule from "../components/CreateModule";
import ModulesList from "../components/ModulesList";

const Modules = ({ modules }: { modules: DataModule[] }) => {
  const [modulesState, setModulesState] = useState(modules);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/modules`)
        .then(response => setModulesState(response.data.modules));
    }, []);
  }

  return (
    <Layout>
      <ResponsiveContext.Consumer>
        {size => {
          return (
            <Box
              pad={size === "small" ? "medium" : "small"}
              width={size === "small" ? "100%" : "60%"}
              alignSelf="center"
            >
              <Accordion>
                <AccordionPanel label="Create new Module">
                  <CreateModule
                    modules={modulesState}
                    setModulesState={setModulesState}
                  ></CreateModule>
                </AccordionPanel>

                <ModulesList
                  modules={modulesState}
                  setModulesState={setModulesState}
                />
              </Accordion>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    </Layout>
  );
};

Modules.getInitialProps = async () => {
  if (process.env.NODE_ENV !== "development") {
    const response = await axios.get(
      `${process.env.MODULES_SERVICE_PROD}/modules`
    );
    return { modules: response.data.modules };
  } else {
    return { modules: [] };
  }
};

export default Modules;
