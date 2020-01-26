import { Form, Heading, FormField, Box, Button } from "grommet";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import * as Icons from "grommet-icons";

const EditJob = ({
  setEditJob,
  job,
  setJobState
}: {
  setEditJob: Dispatch<SetStateAction<boolean>>;
  job: Job;
  setJobState: Dispatch<SetStateAction<Job>>;
}) => {
  const updateJob = async e => {
    const interval = e.target.interval.value;
    if (interval !== "") {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs/update`
          : `${process.env.MODULES_SERVICE_PROD}/jobs/update`,
        {
          moduleId: job.moduleId,
          execute: job.execute,
          interval: interval
        }
      );
    }

    const responseJob = await axios.get(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/jobs/id/${job.moduleId}`
        : `${process.env.MODULES_SERVICE_PROD}/jobs/id/${job.moduleId}`
    );

    setJobState(responseJob.data.jobs[0]);
    setEditJob(false);
  };

  return (
    <Box>
      <Heading size="xxsmall">Edit Job</Heading>
      <Box pad="small">
        <Form onSubmit={e => updateJob(e)}>
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
            value={job.interval}
          />
          <Button
            type="submit"
            primary
            label="Update Job"
            icon={<Icons.Update />}
          />
        </Form>
      </Box>
    </Box>
  );
};

export default EditJob;
