import { getDashboardById } from "../../loaders/dashboards";
import { useEffect, useState } from "react";
import { queryData } from "../../loaders/store";

// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import Box from "../../components/Box";
import RadialBarChart from "../../components/RadialBarChart";
import FunnelChart from "../../components/FunnelChart";
import LineChart from "../../components/LineChart";
import ChartCard from "../../components/ChartCard";

const DashboardPage = ({
  query,
  dashboard
}: {
  query: { dashboardId: string };
  dashboard: Dashboard;
}) => {
  const [dashboardState, setDashboardState] = useState<Dashboard>(dashboard);
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      getDashboardById(query.dashboardId).then(response =>
        setDashboardState(response.data.dashboards[0])
      );
    }, []);
  }

  useEffect(() => {
    queryData({
      moduleIds: dashboard.components.flatMap(component => {
        return component.searchQueries.flatMap(
          searchQuery => searchQuery.moduleIds
        );
      }),
      query: {},
      size: 1000
    }).then(response => {
      const dataWithCount = response.data.data.reduce(
        (b, c) => (
          (
            b[b.findIndex(d => d.name === c.hostname)] ||
            b[b.push({ name: c.hostname, value: 0 }) - 1]
          ).value++,
          b
        ),
        []
      );

      const fiveTopValues = dataWithCount
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setData(fiveTopValues);
    });
  }, [dashboardState]);

  return (
    <Layout activeMenuItem="">
      <PageTitle title={dashboard.name} />
      <Box
        style={{ display: "flex", flexWrap: "wrap" }}
        margin="none"
        padding="none"
      >
        {dashboard.components.map(
          async (component: DashboardComponent, key) => {
            const queryPromises = component.searchQueries.map(
              (serchQuery: DashboardSearchQuery) => queryData(serchQuery)
            );

            const responses = await Promise.all(queryPromises);
            console.log(responses);
          }
        )}
        <ChartCard
          title="Bar Chart"
          subHeading="Hostnames"
          chart={<BarChart yAxisKeys={["value"]} xAxisKey="name" data={data} />}
        />
        <ChartCard
          title="Pie Chart"
          subHeading="Hostnames"
          chart={<PieChart data={data} />}
        />
        <ChartCard
          title="Radial Bar Chart"
          subHeading="Hostnames"
          chart={<RadialBarChart data={data} />}
        />
        <ChartCard
          title="Funnel Chart"
          subHeading="Hostnames"
          chart={<FunnelChart data={data} />}
        />
        <ChartCard
          title="Line Chart"
          subHeading="Hostnames"
          chart={<LineChart lines={[{ dataKey: "value" }]} data={data} />}
        />
      </Box>
    </Layout>
  );
};

DashboardPage.getInitialProps = async ({ res, query }) => {
  if (process.env.NODE_ENV !== "development") {
    const responseGetDashboard = await getDashboardById(query.dashboardId);

    return {
      dashboard: responseGetDashboard.data.dashboards[0],
      query
    };
  } else {
    return { dashboard: {}, query };
  }
};

export default DashboardPage;
