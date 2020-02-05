// Components
import Layout from "../../../components/Layout";

const DashboardPageForModule = ({ query }) => {
  return <Layout></Layout>;
};

DashboardPageForModule.getInitialProps = async ({ res, query }) => {
  return { query };
};

export default DashboardPageForModule;
