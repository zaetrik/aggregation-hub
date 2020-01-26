import { DataModule } from "../../types/dataModule";
import Layout from "../../components/Layout";
import { Heading, Box, Button } from "grommet";
import axios from "axios";
import ModuleOverview from "../../components/ModuleOverview";
import JobOverview from "../../components/JobOverview";
import CreateJob from "../../components/CreateJob";
import { useState, useEffect } from "react";
import * as Icons from "grommet-icons";
import EditJob from "../../components/EditJob";

const Module = ({
  module,
  job,
  query
}: {
  module: DataModule;
  job: Job;
  query?: { moduleId: string };
}) => {
  const [jobState, setJobState] = useState<Job>(job);
  const [editJob, setEditJob] = useState<boolean>(false);
  const [moduleState, setModuleState] = useState<DataModule>(module);

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/modules/id/${query.moduleId}`)
        .then(response => setModuleState(response.data.modules[0]));

      axios
        .get(`${process.env.MODULES_SERVICE_DEV}/jobs/id/${query.moduleId}`)
        .then(response => setJobState(response.data.jobs[0]));
    }, []);
  }

  return moduleState ? (
    <Layout>
      <Box pad="medium" gap="small">
        <Box direction="row">
          <Heading alignSelf="start">{moduleState.name}</Heading>
          <Button
            alignSelf="end"
            margin="auto"
            icon={<Icons.PieChart />}
            label="Go to Dashboard"
            hoverIndicator
            primary
            onClick={() =>
              (location.href = "http://localhost:5601/app/kibana#/discover")
            }
          />
        </Box>
        {jobState ? (
          editJob ? (
            <EditJob
              setEditJob={setEditJob}
              job={jobState}
              setJobState={setJobState}
            ></EditJob>
          ) : (
            <JobOverview
              setEditJob={setEditJob}
              job={jobState}
              setJobState={setJobState}
            ></JobOverview>
          )
        ) : (
          <CreateJob setJobState={setJobState} module={moduleState}></CreateJob>
        )}

        <ModuleOverview module={moduleState} setModuleState={setModuleState} />
      </Box>
    </Layout>
  ) : null;
};

Module.getInitialProps = async ({ res, query }) => {
  if (process.env.NODE_ENV !== "development") {
    const responseModule = await axios.get(
      `${process.env.MODULES_SERVICE_PROD}/modules/id/${query.moduleId}`
    );

    const responseJob = await axios.get(
      `${process.env.MODULES_SERVICE_PROD}/jobs/id/${query.moduleId}`
    );

    return {
      module: responseModule.data.modules[0],
      job: responseJob.data.jobs[0]
    };
  } else {
    return { module: undefined, job: undefined, query };
  }
};

export default Module;
