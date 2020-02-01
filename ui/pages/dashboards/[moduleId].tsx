import { getModuleById, getJobByModuleId } from "../../loaders/modules";

// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";

const ModuleDashboardPage = ({ query }: { query: { moduleId: string } }) => {
  return (
    <Layout activeMenuItem="">
      <PageTitle title="Dashboard" />
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
