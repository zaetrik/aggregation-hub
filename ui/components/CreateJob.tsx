import { DataModule } from "../types/dataModule";
import { Box, Form, Button, FormField, CheckBox, Heading } from "grommet";
import axios from "axios";
import { useState, SetStateAction, Dispatch } from "react";

const CreateJob = ({
  module,
  setJobState
}: {
  module: DataModule;
  setJobState: Dispatch<SetStateAction<Job>>;
}) => {
  const [checked, setChecked] = useState(true);

  const createNewJob = async e => {
    const interval = e.target.interval.value;
    if (interval !== "") {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs`
          : `${process.env.MODULES_SERVICE_PROD}/jobs`,
        {
          moduleId: module.id,
          interval: interval,
          execute: checked
        }
      );
    }

    const responseJob = await axios.get(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/jobs/id/${module.id}`
        : `${process.env.MODULES_SERVICE_PROD}/jobs/id/${module.id}`
    );

    setJobState(responseJob.data.jobs[0]);
  };

  return (
    <Box>
      <Heading size="xxsmall">Create New Job</Heading>
      <Box pad="small">
        <Form onSubmit={e => createNewJob(e)}>
          <FormField
            required={true}
            validate={{
              regexp: new RegExp(/^[1-9][0-9]*$/),
              message: "Interval should be greater than 0"
            }}
            name="interval"
            help="Interval in minutes in which the module should aggregate data"
            label="Interval"
            type="number"
          />
          <Box pad="small">
            <CheckBox
              checked={checked}
              label="Activate Job"
              onChange={event => setChecked(event.target.checked)}
            />
          </Box>
          <Button type="submit" primary label="Create Job" />
        </Form>
      </Box>
    </Box>
  );
};

export default CreateJob;
