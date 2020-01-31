import { useState, useEffect } from "react";
import axios from "axios";

// Components
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import CreateJob from "../../components/CreateJob";
import ModuleOverview from "../../components/ModuleOverview";
import JobOverview from "../../components/JobOverview";

// Types
import { DataModule } from "../../types/dataModule";

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
