import { useState, useEffect, Fragment } from "react";
import axios from "axios";

// Types
import { DataModule } from "../../types/dataModule";
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";

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
      </Layout>
    </Fragment>
  );
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
