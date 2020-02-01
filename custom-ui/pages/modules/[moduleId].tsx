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

  return moduleState ? (
    <Layout>
      <div style={{ display: "flex" }}>
        <PageTitle title={moduleState.name} />
        <Button
          containerStyle={{ height: "min-content", alignSelf: "center" }}
          title="Go to Dashboard"
          onClick={e => (location.href = `/dashboards/${moduleState.id}`)}
          icon={<FaChartBar />}
        />
      </div>
      {jobState.moduleId ? (
        <JobOverview
          job={jobState}
          setJob={setJobState}
          moduleId={moduleState.id}
        />
      ) : (
        <div style={{ marginLeft: theme.margin.large }}>
          <CreateJob
            moduleId={moduleState.id}
            setJob={setJobState}
            currentInterval={jobState.interval}
          />
        </div>
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
