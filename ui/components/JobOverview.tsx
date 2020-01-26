import { Box, Button, Heading, Text, Clock } from "grommet";
import axios from "axios";
import { SetStateAction, Dispatch, useEffect, useState, Fragment } from "react";
import * as Icons from "grommet-icons";

const JobOverview = ({
  job,
  setJobState,
  setEditJob
}: {
  job: Job;
  setJobState: Dispatch<SetStateAction<Job>>;
  setEditJob: Dispatch<SetStateAction<boolean>>;
}) => {
  const [countdown, setCountdown] = useState<{
    run: boolean | "backward";
    time: string;
    timestamp: number;
  }>({
    run: true,
    time: "1969-12-T00:00:000Z",
    timestamp: 0
  });

  const getTimeUntilNextJobExecution = () => {
    const nextExecution = Number(job.lastExecuted) + job.interval * 1000 * 60;
    const timeUntilNextExecution = nextExecution - new Date().getTime();
    const timeUntilNextExecutionString = new Date(
      timeUntilNextExecution
    ).toISOString();

    if (timeUntilNextExecution > 1000) {
      if (timeUntilNextExecution > 1440 * 1000 * 60) {
        setCountdown({
          run: false,
          time: new Date(nextExecution).toISOString(),
          timestamp: nextExecution
        });
      } else {
        setCountdown({
          run: "backward",
          time: timeUntilNextExecutionString,
          timestamp: nextExecution
        });
      }
    } else {
      setCountdown({
        run: true,
        time: "1969-12-T00:00:000Z",
        timestamp: nextExecution
      });
    }
  };

  const setExecute = async (execute: boolean, moduleId: string) => {
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/jobs/update`
        : `${process.env.MODULES_SERVICE_PROD}/jobs/update`,
      {
        execute: execute,
        interval: job.interval,
        moduleId: moduleId
      }
    );
    setJobState({ ...job, execute: execute });
  };

  useEffect(() => {
    getTimeUntilNextJobExecution();
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const responseJob = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.MODULES_SERVICE_DEV}/jobs/id/${job.moduleId}`
          : `${process.env.MODULES_SERVICE_PROD}/jobs/id/${job.moduleId}`
      );
      setJobState(responseJob.data.jobs[0]);
    }, 3000);

    return () => clearInterval(interval);
  }, [job]);

  return (
    <Box pad="small">
      <Heading size="xxsmall">Job</Heading>
      <Box direction="row">
        <Button
          alignSelf="start"
          margin="small"
          icon={job.execute ? <Icons.Stop /> : <Icons.Play />}
          label={job.execute ? "Stop Job" : "Start Job"}
          hoverIndicator
          onClick={() => setExecute(!job.execute, job.moduleId)}
        ></Button>
        <Button
          margin="small"
          icon={<Icons.Edit />}
          label="Edit"
          hoverIndicator
          onClick={() => setEditJob(true)}
        ></Button>
      </Box>
      <Box pad="small">
        <Box direction="row" style={{ marginBottom: "10px" }}>
          <Icons.InProgress style={{ marginRight: "10px" }}></Icons.InProgress>
          <Text>
            Job is currently{" "}
            <Text color={job.running ? "status-ok" : "status-error"}>
              <strong>{job.running ? "running" : "not running"}</strong>
            </Text>
          </Text>
        </Box>
        <Box direction="row" style={{ marginBottom: "10px" }}>
          <Icons.FormSchedule
            style={{ marginRight: "10px" }}
          ></Icons.FormSchedule>
          <Text>
            Executed in a{" "}
            <strong>
              {job.interval} {job.interval < 2 ? "minute" : "minutes"}
            </strong>{" "}
            interval
          </Text>
        </Box>
        {job.execute ? (
          <Box direction="row" style={{ marginBottom: "10px" }}>
            <Icons.Alarm style={{ marginRight: "10px" }} />

            {countdown.timestamp - new Date().getTime() < 1440 * 1000 * 60 ? (
              <Fragment>
                <Text>Next execution in </Text>
                <strong>
                  <Clock
                    style={{ marginLeft: "5px" }}
                    type="digital"
                    run={countdown.run}
                    time={countdown.time}
                  />
                </strong>{" "}
              </Fragment>
            ) : (
              <Fragment>
                <Text>
                  Next execution{" "}
                  <strong>
                    {new Date(countdown.timestamp).toDateString()}
                  </strong>
                </Text>
                <strong>
                  <Clock
                    style={{ marginLeft: "5px" }}
                    type="digital"
                    run={countdown.run}
                    time={new Date(
                      new Date(countdown.time).getTime() + 1000 * 60 * 60
                    ).toISOString()}
                  />
                </strong>
              </Fragment>
            )}
          </Box>
        ) : null}
        <Box direction="row" style={{ marginBottom: "10px" }}>
          <Icons.History style={{ marginRight: "10px" }}></Icons.History>
          {new Date(Number(job.lastExecuted)).toDateString() ===
          "Tue Sep 23 1969" ? (
            <Text>Never executed</Text>
          ) : (
            <Fragment>
              <Text>
                Last execution{" "}
                <strong>
                  {new Date(Number(job.lastExecuted)).toDateString()}
                </strong>
              </Text>
              <strong>
                <Clock
                  style={{ marginLeft: "5px" }}
                  type="digital"
                  run={false}
                  time={new Date(
                    Number(job.lastExecuted) + 1000 * 60 * 60
                  ).toISOString()}
                />
              </strong>
            </Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobOverview;
