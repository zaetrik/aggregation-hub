import { getModuleById, getJobByModuleId } from "../../loaders/modules";
import { useEffect, useState } from "react";
import { queryData } from "../../loaders/store";
import theme from "../../theme";

// Components
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import Card from "../../components/Card";
import Box from "../../components/Box";
import { Resizable } from "re-resizable";

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
  const [data, setData] = useState<{
    pieChart: { name: string; value: number }[];
    barChart: any[];
  }>({ pieChart: [], barChart: [] });

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
            b[b.findIndex(d => d.hostname === c.hostname)] ||
            b[b.push({ hostname: c.hostname, count: 0 }) - 1]
          ).count++,
          b
        ),
        []
      );

      const fiveTopValues = dataWithCount
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setData({
        pieChart: fiveTopValues.map(item => {
          return { name: item.hostname, count: item.count };
        }),
        barChart: fiveTopValues
      });
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
        <Resizable
          maxWidth="100%"
          defaultSize={{
            width: "50%",
            height: "auto"
          }}
        >
          <Card
            hover={false}
            justifyContent="center"
            title="Bar Chart"
            subHeading="Hostnames"
            containerStyle={{
              margin: theme.margin.medium
            }}
          >
            <BarChart
              yAxisKeys={["count"]}
              xAxisKey="hostname"
              data={data.barChart}
            />
          </Card>
        </Resizable>
        <Resizable
          maxWidth="100%"
          defaultSize={{
            width: "50%",
            height: "auto"
          }}
        >
          <Card
            hover={false}
            justifyContent="center"
            title="Pie Chart"
            subHeading="Hostnames"
            containerStyle={{
              margin: theme.margin.medium
            }}
          >
            <PieChart data={data.pieChart} />
          </Card>
        </Resizable>
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
