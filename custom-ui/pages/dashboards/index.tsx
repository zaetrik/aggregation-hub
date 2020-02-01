// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";

const DashboardsPage = ({ query }: { query: { moduleId: string } }) => {
  return (
    <Layout activeMenuItem="dashboards">
      <PageTitle title="Dashboards" />
    </Layout>
  );
};

DashboardsPage.getInitialProps = async ({ res, query }) => {
  return { query };
};

export default DashboardsPage;
