import { getModuleById, getJobByModuleId } from "../../loaders/modules";
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
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

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

  useEffect(() => {
    queryData({
      moduleIds: [query.moduleId],
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
  }, []);

  return (
    <Layout activeMenuItem="">
      <PageTitle title={`Dashboard for ${moduleState.name}`} />
      <Box
        style={{ display: "flex", flexWrap: "wrap" }}
        margin="none"
        padding="none"
      >
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
