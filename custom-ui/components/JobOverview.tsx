import { Fragment, Dispatch, useState, SetStateAction } from "react";
import { startJob } from "../loaders/modules";
import theme from "../theme";

// Components
import { FaPlay, FaEdit } from "react-icons/fa";
import Button from "./Button";
import UpdateJob from "./UpdateJob";
import Heading from "./Heading";

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

  return (
    <Fragment>
      <Heading size="large" fontWeight={200}>
        {!editJob ? "Job" : "Update Job"}
      </Heading>
      <div style={{ marginLeft: theme.margin.large }}>
        {editJob ? (
          <UpdateJob job={job} setJob={setJob} setEditJob={setEditJob} />
        ) : (
          <Fragment>
            <Button
              onClick={async e => {
                const event = e.currentTarget;
                event.disabled = true;
                setTimeout(() => {
                  event.disabled = false;
                }, 5000);
                await startJob(moduleId);
              }}
              title="Execute Job"
              icon={<FaPlay />}
            />
            <Button
              containerStyle={{ marginLeft: "10px" }}
              onClick={async e => {
                setEditJob(true);
              }}
              title="Edit Job"
              icon={<FaEdit />}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
