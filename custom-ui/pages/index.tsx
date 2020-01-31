import axios from "axios";
import { Fragment, useState, useEffect, Dispatch, SetStateAction } from "react";

// Components
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChartBar, FaPlus } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import AccordionPanel from "../components/AccordionPanel";
import Text from "../components/Text";

// Types
import { DataModule } from "../types/dataModule";

export default () => {
  const [modules, setModules] = useState<DataModule[]>([]);

  useEffect(() => {
    getModules().then(modules => setModules(modules));
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

const getModules = async (): Promise<DataModule[]> => {
  const response = await axios.get(
    `${process.env.MODULES_SERVICE_DEV}/modules`
  );
  return response.data.modules;
};

const ModulesList = ({
  modules,
  setModules
}: {
  modules: DataModule[];
  setModules: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const deleteModule = async (moduleId: string) => {
    await axios.delete(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/modules/id/${moduleId}?deleteData=true`
        : `${process.env.MODULES_SERVICE_PROD}/modules/id/${moduleId}?deleteData=true`
    );

    const updatedModules = await getModules();
    setModules(updatedModules);
  };

  return (
    <Fragment>
      {modules.map((module, key) => (
        <div key={key}>
          <Card
            containerStyle={{ maxWidth: "600px" }}
            title={module.name}
            onClick={e => (location.href = `/modules/${module.id}`)}
          >
            <Button
              containerStyle={{ marginRight: "10px" }}
              title="Delete"
              onClick={e => deleteModule(module.id)}
              icon={<AiOutlineDelete />}
            />
            <Button
              title="Go to Dashboard"
              onClick={e => (location.href = `/dashboards/${module.id}`)}
              icon={<FaChartBar />}
            />
          </Card>
        </div>
      ))}
    </Fragment>
  );
};

const CreateNewModule = ({
  setModules
}: {
  setModules: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const [formData, setFormData] = useState<{
    moduleName: string;
    moduleAddress: string;
  }>({ moduleName: "", moduleAddress: "" });

  const createNewModule = async () => {
    if (formData.moduleName !== "" && formData.moduleAddress !== "") {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/modules`
          : `${process.env.MODULES_SERVICE_PROD}/modules`,
        { name: formData.moduleName, address: formData.moduleAddress }
      );

      const updatedModules = await getModules();
      setModules(updatedModules);
    }
  };

  return (
    <Fragment>
      <div>
        <Input
          placeholder="Choose a name for your module"
          label="Name"
          type="text"
          onChange={e =>
            setFormData({ ...formData, moduleName: e.target.value })
          }
        />
        <Input
          placeholder="Enter the address of the module"
          label="Address"
          type="text"
          onChange={e =>
            setFormData({ ...formData, moduleAddress: e.target.value })
          }
        />
        <Button
          containerStyle={{ margin: "10px 5px" }}
          title="Create Module"
          icon={<FaPlus />}
          onClick={e => createNewModule()}
        />
      </div>
      <style jsx>{``}</style>
    </Fragment>
  );
};
