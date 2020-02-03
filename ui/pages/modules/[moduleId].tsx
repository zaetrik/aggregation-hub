import { useState, useEffect } from "react";
import { getModuleById, getJobByModuleId } from "../../loaders/modules";
import theme from "../../theme";

// Components
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import CreateJob from "../../components/CreateJob";
import ModuleOverview from "../../components/ModuleOverview";
import JobOverview from "../../components/JobOverview";
import Button from "../../components/Button";
import { FaChartBar } from "react-icons/fa";
import Box from "../../components/Box";

// Types
import { DataModule } from "../../types/dataModule";

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
  const [moduleState, setModuleState] = useState<DataModule>(module);

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
    if (job.moduleId) {
      const interval = setInterval(async () => {
        const responseGetJob = await getJobByModuleId(query.moduleId);
        setJobState(responseGetJob.data.jobs[0]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [job]);

  return moduleState ? (
    <Layout>
      <div
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          display: "flex",
          borderBottom: `1px solid ${theme.colors.hoverColor}`
        }}
      >
        <Box padding="none" margin="none">
          <PageTitle
            title={moduleState.name}
            subHeading={moduleState.address}
          />
        </Box>
        <Box
          padding="none"
          margin="none"
          style={{
            alignSelf: "center",
            justifySelf: "end"
          }}
        >
          <Button
            title="Go to Dashboard"
            onClick={e => (location.href = `/dashboards/${moduleState.id}`)}
            icon={<FaChartBar />}
          />
        </Box>
      </div>
      {jobState.moduleId ? (
        <JobOverview
          job={jobState}
          setJob={setJobState}
          moduleId={moduleState.id}
        />
      ) : (
        <CreateJob
          moduleId={moduleState.id}
          setJob={setJobState}
          currentInterval={jobState.interval}
        />
      )}
      <ModuleOverview module={moduleState} />
    </Layout>
  ) : null;
};

ModulePage.getInitialProps = async ({ res, query }) => {
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

export default ModulePage;
