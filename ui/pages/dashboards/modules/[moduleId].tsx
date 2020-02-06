import { getModuleById, getJobByModuleId } from "../../../loaders/modules";
import { useEffect, useState, Fragment } from "react";
import { queryData } from "../../../loaders/store";
import {
  createNewDashboard,
  getDashboardByModuleId
} from "../../../loaders/dashboards";

// Components
import Layout from "../../../components/Layout";
import PageTitle from "../../../components/PageTitle";
import BarChart from "../../../components/BarChart";
import PieChart from "../../../components/PieChart";
import Box from "../../../components/Box";
import RadialBarChart from "../../../components/RadialBarChart";
import FunnelChart from "../../../components/FunnelChart";
import LineChart from "../../../components/LineChart";
import ChartCard from "../../../components/ChartCard";

// Types
import { DataModule } from "../../../types/dataModule";

const DashboardPageForModule = ({
  query,
  module,
  job,
  dashboard
}: {
  query: { moduleId: string };
  module: DataModule;
  job: Job;
  dashboard: Dashboard;
}) => {
  const [moduleState, setModuleState] = useState<DataModule>(module);
  const [jobState, setJobState] = useState<Job>(job);
  const [dashboardState, setDashboardState] = useState<Dashboard>(dashboard);
  const [charts, setCharts] = useState<JSX.Element[]>([]);
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      getModuleById(query.moduleId).then(response => {
        const module: DataModule = response.data.modules[0];
        setModuleState(module);
        checkIfDashboardExistsOrCreateANewOne(module).then(dashboard => {
          setDashboardState(dashboard);
        });
      });

      getJobByModuleId(query.moduleId).then(response =>
        setJobState(response.data.jobs[0] ? response.data.jobs[0] : {})
      );
    }, []);
  }

  useEffect(() => {
    if (dashboardState.components) {
      getChartComponents().then(charts => setCharts(charts));
    }
  }, [dashboardState]);

  const getChartComponents = async () => {
    const promises = dashboardState.components.map(
      async (component: DashboardComponent, key) => {
        const queryPromises = component.searchQueries.map(
          (serchQuery: DashboardSearchQuery) => queryData(serchQuery)
        );

        const responses = await Promise.all(queryPromises);
        const mergedData = responses.flatMap(response => response.data.data);

        const dataWithCount = mergedData.reduce(
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

        const chartComponent = () => {
          switch (component.name) {
            case "BarChart":
              return (
                <BarChart
                  yAxisKeys={["value"]}
                  xAxisKey="name"
                  data={fiveTopValues}
                />
              );
            case "PieChart":
              return <PieChart data={fiveTopValues} />;
            case "FunnelChart":
              return <FunnelChart data={fiveTopValues} />;
            case "RadialBarChart":
              return <RadialBarChart data={fiveTopValues} />;
            case "LineChart":
              return (
                <LineChart
                  lines={[{ dataKey: "value" }]}
                  data={fiveTopValues}
                />
              );
            default:
              return undefined;
          }
        };

        const chartCardComponent = () => {
          if (chartComponent()) {
            return (
              <ChartCard
                key={key}
                title={
                  component.chartHeading ? component.chartHeading : undefined
                }
                subHeading={
                  component.chartSubHeading
                    ? component.chartSubHeading
                    : undefined
                }
                chart={chartComponent()}
              />
            );
          }
        };

        return chartCardComponent();
      }
    );

    return await Promise.all(promises);
  };

  return (
    <Layout activeMenuItem="">
      <PageTitle title={`Dashboard for ${moduleState.name}`} />
      <Box
        style={{ display: "flex", flexWrap: "wrap" }}
        margin="none"
        padding="none"
      >
        {charts.map((chart, key) => (
          <Fragment key={key}>{chart}</Fragment>
        ))}
      </Box>
    </Layout>
  );
};

DashboardPageForModule.getInitialProps = async ({ res, query }) => {
  if (process.env.NODE_ENV !== "development") {
    const responseModule = await getModuleById(query.moduleId);
    const module: DataModule = responseModule.data.modules[0];

    const responseJob = await getJobByModuleId(query.moduleId);
    const job: Job = responseJob.data.jobs[0];

    const dashboard: Dashboard = await checkIfDashboardExistsOrCreateANewOne(
      module
    );

    return {
      module: module,
      job: job,
      dashboard: dashboard,
      query
    };
  } else {
    return { module: {}, job: {}, dashboard: {}, query };
  }
};

const checkIfDashboardExistsOrCreateANewOne = async (module: DataModule) => {
  const responseGetModuleDashboard = await getDashboardByModuleId(module.id);

  if (!responseGetModuleDashboard.data.dashboards[0]) {
    const newDashboard: Dashboard = {
      moduleId: module.id,
      name: module.name,
      components: []
    };
    await createNewDashboard(newDashboard);
    return newDashboard;
  } else {
    return responseGetModuleDashboard.data.dashboards[0].dashboard;
  }
};

export default DashboardPageForModule;
