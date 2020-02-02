import { Fragment, Dispatch, useState, SetStateAction, useEffect } from "react";
import { startJob, updateJob } from "../loaders/modules";
import theme from "../theme";

// Components
import { FaPlay, FaEdit, FaStop } from "react-icons/fa";
import Button from "./Button";
import UpdateJob from "./UpdateJob";
import Heading from "./Heading";
import JobInfos from "./JobInfos";
import Box from "./Box";

export default ({
  job,
  setJob,
  moduleId
}: {
  job: Job;
  setJob: Dispatch<SetStateAction<Job>>;
  moduleId: string;
}) => {
  const [editJob, setEditJob] = useState<boolean>(false);

  const setExecute = async (execute: boolean) => {
    await updateJob({
      execute: execute,
      interval: job.interval,
      moduleId: moduleId
    });

    setJob({ ...job, execute: execute });
  };

  return (
    <Fragment>
      <Heading size="large" fontWeight={200}>
        {!editJob ? "Job" : "Update Job"}
      </Heading>
      <Box style={{ borderBottom: `1px solid ${theme.colors.hoverColor}` }}>
        {editJob ? (
          <UpdateJob job={job} setJob={setJob} setEditJob={setEditJob} />
        ) : (
          <Fragment>
            <Button
              containerStyle={{ marginLeft: theme.margin.small }}
              onClick={async e => {
                const event = e.currentTarget;
                event.disabled = true;
                setTimeout(() => {
                  event.disabled = false;
                }, 5000);
                await startJob(moduleId);
              }}
              title="Start an aggregation process"
              icon={<FaPlay />}
            />
            <Button
              containerStyle={{ marginLeft: theme.margin.medium }}
              onClick={async e => {
                await setExecute(!job.execute);
              }}
              title={job.execute ? "Stop Job" : "Start Job"}
              icon={job.execute ? <FaStop /> : <FaPlay />}
            />

            <Button
              containerStyle={{ marginLeft: theme.margin.medium }}
              onClick={async e => {
                setEditJob(true);
              }}
              title="Edit Job"
              icon={<FaEdit />}
            />
            <JobInfos job={job} />
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
};
