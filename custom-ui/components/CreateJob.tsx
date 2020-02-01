import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import { createJob, getJobByModuleId } from "../loaders/modules";

// Components
import Input from "./Input";
import Button from "./Button";

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
      <Input
        type="number"
        onChange={e => setInterval(e.currentTarget.value)}
        placeholder="Enter the Job Interval"
        label="Interval"
        value={interval}
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(!checked)}
      />
      <Button type="submit" title="Create Job" onClick={e => createNewJob()} />
    </Fragment>
  );
};
