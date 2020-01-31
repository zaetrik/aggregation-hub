import { Fragment, Dispatch, useState, SetStateAction } from "react";
import axios from "axios";

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

  const startJob = async () => {
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/aggregation/${moduleId}/start`
        : `${process.env.MODULES_SERVICE_DEV}/aggregation/${moduleId}/start`,
      {}
    );
  };
  return (
    <Fragment>
      <Heading size="large" fontWeight={200}>
        Job
      </Heading>
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
              await startJob();
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
    </Fragment>
  );
};
