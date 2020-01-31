import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";

// Components
import Input from "./Input";
import Button from "./Button";

export default ({
  job,
  setJob,
  setEditJob
}: {
  job: Job;
  setJob: Dispatch<SetStateAction<Job>>;
  setEditJob: Dispatch<SetStateAction<boolean>>;
}) => {
  const [checked, setChecked] = useState<boolean>(job.execute);
  const [interval, setInterval] = useState<number>(
    job.interval ? job.interval : 1
  );

  useEffect(() => {
    setInterval(job.interval);
  }, [job]);

  const updateJob = async () => {
    if (interval > 0) {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs/update`
          : `${process.env.MODULES_SERVICE_PROD}/jobs/update`,
        {
          moduleId: job.moduleId,
          execute: checked,
          interval: interval
        }
      );

      const responseGetJob = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs/id/${job.moduleId}`
          : `${process.env.MODULES_SERVICE_PROD}/jobs/id/${job.moduleId}`
      );

      setJob(responseGetJob.data.jobs[0]);
      setEditJob(false);
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
      <Button type="submit" title="Update Job" onClick={e => updateJob()} />
    </Fragment>
  );
};
