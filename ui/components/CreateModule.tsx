import { Box, Form, FormField, Button, Heading } from "grommet";
import { DataModule } from "../types/dataModule";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const CreateModule = ({
  setModulesState,
  modules
}: {
  modules: DataModule[];
  setModulesState: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  const createNewModule = async e => {
    if (e.target.moduleName.value !== "" && e.target.address.value !== "") {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/modules`
          : `${process.env.MODULES_SERVICE_PROD}/modules`,
        { name: e.target.moduleName.value, address: e.target.address.value }
      );

      const responseModules = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/modules`
          : `${process.env.MODULES_SERVICE_PROD}/modules`
      );

      setModulesState(responseModules.data.modules);
    }
  };

  return (
    <Box pad="medium">
      <Form onSubmit={e => createNewModule(e)}>
        <FormField
          required={true}
          name="moduleName"
          help="Name of the module"
          label="Name"
          type="text"
        />
        <FormField
          required={true}
          name="address"
          help="Address of the module"
          label="Address"
          type="text"
        />
        <Button type="submit" primary label="Create Module" />
      </Form>
    </Box>
  );
};

export default CreateModule;
