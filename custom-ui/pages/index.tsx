import axios from "axios";
import {
  Fragment,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent
} from "react";

// Components
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChartBar, FaPlus } from "react-icons/fa";
import Button from "../components/Button";

// Types
import { DataModule } from "../types/dataModule";

export default () => {
  const [modules, setModules] = useState<DataModule[]>([]);

  useEffect(() => {
    getModules().then(modules => setModules(modules));
  }, []);

  const getModules = async (): Promise<DataModule[]> => {
    const response = await axios.get(
      `${process.env.MODULES_SERVICE_DEV}/modules`
    );
    return response.data.modules;
  };

  return (
    <Fragment>
      <Layout activeMenuItem="Modules">
        <PageTitle title="Modules" />
        <CreateNewModule setModules={setModules} />
        {modules.length > 0 ? (
          <ModulesList modules={modules} setModules={setModules} />
        ) : (
          <h3>No Modules Available</h3>
        )}
      </Layout>
      <style jsx>{``}</style>
    </Fragment>
  );
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
    setModules(modules.filter(module => module.id !== moduleId));
  };

  return (
    <Fragment>
      {modules.map((module, key) => (
        <div>
          <Card
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

      const responseModules = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/modules`
          : `${process.env.MODULES_SERVICE_PROD}/modules`
      );

      setModules(responseModules.data.modules);
    }
  };

  return (
    <Fragment>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="moduleName"
            onChange={e =>
              setFormData({ ...formData, moduleName: e.target.value })
            }
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="moduleAddress"
            onChange={e =>
              setFormData({ ...formData, moduleAddress: e.target.value })
            }
          />
        </label>
        <Button
          containerStyle={{ margin: "10px" }}
          title="Create Module"
          icon={<FaPlus />}
          onClick={e => createNewModule()}
        />
      </div>
      <style jsx>{``}</style>
    </Fragment>
  );
};
