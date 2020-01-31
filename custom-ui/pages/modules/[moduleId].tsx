import { useState, useEffect, Fragment, Dispatch, SetStateAction } from "react";
import axios from "axios";

// Types
import { DataModule } from "../../types/dataModule";

// Components
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import AccordionPanel from "../../components/AccordionPanel";
import ModuleMappingOverview from "../../components/ModuleMappingOverview";
import { FaArrowRight, FaDatabase } from "react-icons/fa";
import ModuleDataExample from "../../components/ModuleDataExample";
import ModuleDocumentCount from "../../components/ModuleDocumentCount";

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
  const [editJob, setEditJob] = useState<boolean>(false);
  const [moduleState, setModuleState] = useState<DataModule>(module);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/modules/id/${query.moduleId}`)
        .then(response => setModuleState(response.data.modules[0]));

      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/jobs/id/${query.moduleId}`)
        .then(response => setJobState(response.data.jobs[0]));
    }, []);
  }

  const startJob = async () => {
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/aggregation/${query.moduleId}/start`
        : `${process.env.MODULES_SERVICE_DEV}/aggregation/${query.moduleId}/start`,
      {}
    );
  };
  return (
    <Fragment>
      <Layout>
        <PageTitle title={moduleState.name} />
        <JobOverview job={jobState} setJob={setJobState} />
        <ModuleOverview module={moduleState} />
      </Layout>
    </Fragment>
  );
};

const JobOverview = ({
  job,
  setJob
}: {
  job: Job;
  setJob: Dispatch<SetStateAction<Job>>;
}) => {
  return <Fragment></Fragment>;
};

const ModuleOverview = ({ module }: { module: DataModule }) => {
  return module.config ? (
    <Fragment>
      <AccordionPanel title="Description" open={true}>
        <h1>{module.config.description}</h1>
      </AccordionPanel>
      <AccordionPanel title="Settings"></AccordionPanel>
      <AccordionPanel title="Mapping">
        <ModuleMappingOverview module={module} />
      </AccordionPanel>
      <AccordionPanel
        title={
          <Fragment>
            <FaDatabase size={20} style={{ paddingRight: "20px" }} />
            Data <FaArrowRight size={20} style={{ padding: "0 20px" }} />
            <ModuleDocumentCount module={module} />
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
