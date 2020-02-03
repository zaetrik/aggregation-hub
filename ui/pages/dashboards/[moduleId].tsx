import { getModuleById, getJobByModuleId } from "../../loaders/modules";
import { useEffect, useState } from "react";

// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";

// Types
import { DataModule } from "../../types/dataModule";

const ModuleDashboardPage = ({
  query,
  module,
  job
}: {
  query: { moduleId: string };
  module: DataModule;
  job: Job;
}) => {
  const [moduleState, setModuleState] = useState<DataModule>(module);
  const [jobState, setJobState] = useState<Job>(job);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      getModuleById(query.moduleId).then(response =>
        setModuleState(response.data.modules[0])
      );

      getJobByModuleId(query.moduleId).then(response =>
        setJobState(response.data.jobs[0] ? response.data.jobs[0] : {})
      );
    }, []);
  }

  return (
    <Layout activeMenuItem="">
      <PageTitle title={`Dashboard for ${moduleState.name}`} />
    </Layout>
  );
};

ModuleDashboardPage.getInitialProps = async ({ res, query }) => {
  if (process.env.NODE_ENV !== "development") {
    const responseModule = await getModuleById(query.moduleId);
    const responseJob = await getJobByModuleId(query.moduleId);

    return {
      module: responseModule.data.modules[0],
      job: responseJob.data.jobs[0],
      query
    };
  } else {
    return { module: {}, job: {}, query };
  }
};

export default ModuleDashboardPage;
