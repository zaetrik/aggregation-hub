import { Dispatch, SetStateAction, Fragment } from "react";
import { deleteModuleById, getAllModules } from "../loaders/modules";

// Components
import Card from "./Card";
import Button from "./Button";
import { FaChartBar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

// Types
import { DataModule } from "../types/dataModule";

export default ({
  modules,
  setModules
}: {
  modules: DataModule[];
  setModules: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const deleteModule = async (moduleId: string) => {
    await deleteModuleById(moduleId);

    const responseUpdatedModules = await getAllModules();
    setModules(responseUpdatedModules.data.modules);
  };

  return (
    <Fragment>
      {modules.map((module, key) => (
        <div key={key}>
          <Card
            subHeading={module.address}
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
