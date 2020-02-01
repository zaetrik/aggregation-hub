import { Fragment, useState, useEffect } from "react";
import { getAllModules } from "../loaders/modules";

// Components
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import AccordionPanel from "../components/AccordionPanel";
import Text from "../components/Text";
import CreateNewModule from "../components/CreateNewModule";
import ModulesList from "../components/ModulesList";

// Types
import { DataModule } from "../types/dataModule";

export default () => {
  const [modules, setModules] = useState<DataModule[]>([]);

  useEffect(() => {
    getAllModules().then(response => setModules(response.data.modules));
  }, []);

  return (
    <Fragment>
      <Layout activeMenuItem="Modules">
        <PageTitle title="Modules" />
        <AccordionPanel
          title="Create New Module"
          containerStyle={{ maxWidth: "600px" }}
        >
          <CreateNewModule setModules={setModules} />
        </AccordionPanel>
        {modules.length > 0 ? (
          <div className="modules-list">
            <ModulesList modules={modules} setModules={setModules} />
          </div>
        ) : (
          <Text>No Modules Available</Text>
        )}
      </Layout>
      <style jsx>{`
        .modules-list {
          margin-top: 40px;
        }
      `}</style>
    </Fragment>
  );
};
