import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import { createJob, getJobByModuleId } from "../loaders/modules";
import theme from "../theme";

// Components
import Input from "./Input";
import Button from "./Button";
import Heading from "./Heading";

export default ({
  moduleId,
  setJob,
  currentInterval
}: {
  moduleId: string;
  setJob: Dispatch<SetStateAction<Job>>;
  currentInterval: number;
}) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [interval, setInterval] = useState<number>(
    currentInterval ? currentInterval : 1
  );

  useEffect(() => {
    setInterval(currentInterval);
  }, [currentInterval]);

  const createNewJob = async () => {
    if (interval > 0) {
      await createJob({
        moduleId: moduleId,
        interval: interval,
        execute: checked
      });

      const responseGetJob = await getJobByModuleId(moduleId);

      setJob(responseGetJob.data.jobs[0]);
    }
  };
  return (
    <Fragment>
      <Heading margin="none" size="large" padding="none" fontWeight={200}>
        Create Job
      </Heading>
      <Input
        type="number"
        onChange={e => setInterval(e.currentTarget.value)}
        placeholder="Enter the Job Interval"
        label="Interval"
        value={interval}
      />
      <label>
        Execute Job
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(!checked)}
        />
      </label>
      <Button
        type="submit"
        containerStyle={{ margin: theme.margin.small }}
        title="Create Job"
        onClick={e => createNewJob()}
      />
      <style jsx>{`
        label {
          margin: ${theme.margin.small};
          width: inherit;
          display: flex;
          flex-flow: column;
        }
      `}</style>
    </Fragment>
  );
};
