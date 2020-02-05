import {
  getAllDashboards,
  deleteDashboardById
} from "../../loaders/dashboards";
import { useState, useEffect } from "react";
import theme from "../../theme";

// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import AccordionPanel from "../../components/AccordionPanel";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { AiOutlineDelete } from "react-icons/ai";
import Text from "../../components/Text";

const DashboardsPage = ({ query }: { query: { moduleId: string } }) => {
  const [dashboards, setDashboards] = useState<
    { id: string; dashboard: Dashboard }[]
  >([]);

  useEffect(() => {
    getAllDashboards().then(response =>
      setDashboards(response.data.dashboards)
    );
  }, []);

  const deleteDashboard = async (dashboardId: string) => {
    await deleteDashboardById(dashboardId);
    const responseUpdatedDashboards = await getAllDashboards();
    setDashboards(responseUpdatedDashboards.data.dashboards);
  };

  return (
    <Layout activeMenuItem="dashboards">
      <PageTitle subHeading="List of your dashboards" title="Dashboards" />
      <AccordionPanel
        title="Create New Dashboard"
        containerStyle={{ maxWidth: "600px" }}
      ></AccordionPanel>
      {dashboards.length > 0 ? (
        <div className="dashboards-list">
          {dashboards.map((dashboard, key) => (
            <Card
              key={key}
              containerStyle={{ maxWidth: "600px" }}
              title={dashboard.dashboard.name}
              subHeading={
                dashboard.dashboard.moduleId
                  ? "Module Dashboard"
                  : "Custom Dashboard"
              }
              onClick={e => {
                if (dashboard.dashboard.moduleId) {
                  location.href = `/dashboards/modules/${dashboard.dashboard.moduleId}`;
                } else {
                  location.href = `/dashboards/${dashboard.id}`;
                }
              }}
            >
              <Button
                containerStyle={{ marginRight: "10px" }}
                title="Delete"
                onClick={e => deleteDashboard(dashboard.id)}
                icon={<AiOutlineDelete />}
              />
            </Card>
          ))}
        </div>
      ) : (
        <div className="dashboards-list">
          <Text size="large">No Dashboards Available</Text>
        </div>
      )}
      <style jsx>{`
        .dashboards-list {
          margin-top: ${theme.margin.xxlarge};
        }
      `}</style>
    </Layout>
  );
};

DashboardsPage.getInitialProps = async ({ res, query }) => {
  return { query };
};

export default DashboardsPage;
