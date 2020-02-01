import { Fragment, Dispatch, SetStateAction, useState, useEffect } from "react";
import { updateJob, getJobByModuleId } from "../loaders/modules";
import theme from "../theme";

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

  const updateJobData = async () => {
    if (interval > 0) {
      await updateJob({
        moduleId: job.moduleId,
        execute: checked,
        interval: interval
      });

      const responseGetJob = await getJobByModuleId(job.moduleId);

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
      <label>
        Execute Job
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(!checked)}
        />
      </label>
      <Button
        containerStyle={{ margin: theme.margin.small }}
        type="submit"
        title="Update Job"
        onClick={e => updateJobData()}
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
