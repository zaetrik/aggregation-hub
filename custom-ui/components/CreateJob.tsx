import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";

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
      console.log({
        moduleId: moduleId,
        interval: interval,
        execute: checked
      });
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs`
          : `${process.env.MODULES_SERVICE_PROD}/jobs`,
        {
          moduleId: moduleId,
          interval: interval,
          execute: checked
        }
      );

      const responseGetJob = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs/id/${moduleId}`
          : `${process.env.MODULES_SERVICE_PROD}/jobs/id/${moduleId}`
      );

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
      <Button type="submit" title="Save Job" onClick={e => createNewJob()} />
    </Fragment>
  );
};
