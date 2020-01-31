import { useState, useEffect, Fragment, Dispatch, SetStateAction } from "react";
import axios from "axios";

// Types
import { DataModule } from "../../types/dataModule";

// Components
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import AccordionPanel from "../../components/AccordionPanel";
import ModuleMappingOverview from "../../components/ModuleMappingOverview";
import { FaDatabase, FaPlay, FaEdit } from "react-icons/fa";
import ModuleDataExample from "../../components/ModuleDataExample";
import ModuleDocumentCount from "../../components/ModuleDocumentCount";
import ModuleAggregationSettings from "../../components/ModuleAggregationSettings";
import CreateJob from "../../components/CreateJob";
import Button from "../../components/Button";

const ModulePage = ({
  module,
  job,
  query
}: {
  module: DataModule;
  job: Job;
  query?: { moduleId: string };
}) => {
  const [jobState, setJobState] = useState<Job>(job);
  const [moduleState, setModuleState] = useState<DataModule>(module);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/modules/id/${query.moduleId}`)
        .then(response => setModuleState(response.data.modules[0]));

      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/jobs/id/${query.moduleId}`)
        .then(response =>
          setJobState(response.data.jobs[0] ? response.data.jobs[0] : {})
        );
    }, []);
  }

  return moduleState ? (
    <Fragment>
      <Layout>
        <PageTitle title={moduleState.name} />
        {jobState.moduleId ? (
          <JobOverview
            job={jobState}
            setJob={setJobState}
            moduleId={moduleState.id}
          />
        ) : (
          <CreateJob
            moduleId={moduleState.id}
            setJob={setJobState}
            currentInterval={jobState.interval}
          />
        )}
        <ModuleOverview module={moduleState} />
      </Layout>
    </Fragment>
  ) : null;
};

const JobOverview = ({
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
      {editJob ? (
        <h1>Update Job</h1>
      ) : (
        <Fragment>
          <h1>Job</h1>
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

const ModuleOverview = ({ module }: { module: DataModule }) => {
  return module.config ? (
    <Fragment>
      <h1>Module</h1>
      <div>
        <ModuleDocumentCount module={module} /> Documents Aggregated
      </div>
      <AccordionPanel title="Description" open={true}>
        <h1>{module.config.description}</h1>
      </AccordionPanel>
      <AccordionPanel title="Settings">
        <ModuleAggregationSettings module={module} />
      </AccordionPanel>
      <AccordionPanel title="Mapping">
        <ModuleMappingOverview module={module} />
      </AccordionPanel>
      <AccordionPanel
        title={
          <Fragment>
            <FaDatabase size={20} style={{ paddingRight: "20px" }} />
            Example Data
          </Fragment>
        }
      >
        <ModuleDataExample module={module} />
      </AccordionPanel>
    </Fragment>
  ) : null;
};

ModulePage.getInitialProps = async ({ res, query }) => {
  if (process.env.NODE_ENV !== "development") {
    const responseModule = await axios.get(
      `${process.env.MODULES_SERVICE_PROD}/modules/id/${query.moduleId}`
    );

    const responseJob = await axios.get(
      `${process.env.MODULES_SERVICE_PROD}/jobs/id/${query.moduleId}`
    );

    return {
      module: responseModule.data.modules[0],
      job: responseJob.data.jobs[0],
      query
    };
  } else {
    return { module: {}, job: {}, query };
  }
};

export default ModulePage;
