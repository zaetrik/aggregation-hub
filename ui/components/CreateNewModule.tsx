import { Dispatch, SetStateAction, useState, Fragment } from "react";
import { createNewModule, getAllModules } from "../loaders/modules";

// Components
import Input from "./Input";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";

// Types
import { DataModule } from "../types/dataModule";

export default ({
  setModules
}: {
  setModules: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const [formData, setFormData] = useState<{
    moduleName: string;
    moduleAddress: string;
  }>({ moduleName: "", moduleAddress: "" });

  const createModule = async () => {
    if (formData.moduleName !== "" && formData.moduleAddress !== "") {
      await createNewModule({
        name: formData.moduleName,
        address: formData.moduleAddress
      });

      const responseUpdatedModules = await getAllModules();
      setModules(responseUpdatedModules.data.modules);
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
          value={formData.moduleName}
        />
        <Input
          placeholder="Enter the address of the module"
          label="Address"
          type="text"
          onChange={e =>
            setFormData({ ...formData, moduleAddress: e.target.value })
          }
          value={formData.moduleAddress}
        />
        <Button
          containerStyle={{ margin: "10px 5px" }}
          title="Create Module"
          icon={<FaPlus />}
          onClick={e => createModule()}
        />
      </div>
      <style jsx>{``}</style>
    </Fragment>
  );
};
