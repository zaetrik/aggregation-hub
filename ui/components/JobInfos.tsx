import { Fragment, useState, useEffect } from "react";
import theme from "../theme";

// Components
import Text from "./Text";
import Box from "./Box";
import { FaClock, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import Icon from "./Icon";

export default ({ job }: { job: Job }) => {
  const getTimeUntilNextJobExecution = () => {
    return Number(job.lastExecuted) + job.interval * 1000 * 60;
  };

  const [nextExecution, setNextExecution] = useState<number>(
    getTimeUntilNextJobExecution()
  );

  useEffect(() => {
    setNextExecution(getTimeUntilNextJobExecution());
  }, [job]);

  return (
    <Fragment>
      <Box
        padding="none"
        margin="none"
        style={{ margin: `${theme.margin.medium} 0` }}
      >
        {!job.execute ? (
          <Box
            padding="none"
            margin="none"
            style={{ margin: `${theme.margin.medium} 0` }}
          >
            <Text>
              Job is{" "}
              <Text margin="none" padding="none" fontWeight={800}>
                paused
              </Text>
            </Text>
          </Box>
        ) : null}
        {job.execute ? (
          <Fragment>
            <Box
              padding="none"
              margin="none"
              style={{ margin: `${theme.margin.medium} 0` }}
            >
              <Text>
                Aggregation process is currently{" "}
                {job.running ? (
                  <Text margin="none" padding="none" fontWeight={800}>
                    running
                  </Text>
                ) : (
                  <Text margin="none" padding="none" fontWeight={800}>
                    not running
                  </Text>
                )}
              </Text>
            </Box>

            <Box
              padding="none"
              margin="none"
              style={{ margin: `${theme.margin.medium} 0` }}
            >
              <Text>
                <Icon icon={<FaCalendarCheck />} />
                Next execution{" "}
                <Text margin="none" padding="none" fontWeight={800}>
                  {`${new Date(Number(nextExecution)).toDateString()}, ${
                    new Date(Number(nextExecution))
                      .toISOString()
                      .split("T")[1]
                      .split("Z")[0]
                      .split(".")[0]
                  }`}
                </Text>
              </Text>
            </Box>
          </Fragment>
        ) : null}
        <Box
          padding="none"
          margin="none"
          style={{ margin: `${theme.margin.medium} 0` }}
        >
          <Text>
            <Icon icon={<FaClock />} />
            Job is executed in a{" "}
            <Text padding="none" margin="none" fontWeight={800}>
              {job.interval} {job.interval < 2 ? "minute" : "minutes"} interval
            </Text>
          </Text>
        </Box>
        <Box
          padding="none"
          margin="none"
          style={{ margin: `${theme.margin.medium} 0` }}
        >
          {new Date(Number(job.lastExecuted)).toDateString() ===
          "Tue Sep 23 1969" ? (
            <Text padding="none" margin="none" fontWeight={800}>
              <Icon icon={<FaCalendarAlt />} />
              Never executed
            </Text>
          ) : (
            <Text>
              <Icon icon={<FaCalendarAlt />} />
              Last execution{" "}
              <Text padding="none" margin="none" fontWeight={800}>
                {`${new Date(Number(job.lastExecuted)).toDateString()}, ${
                  new Date(Number(job.lastExecuted))
                    .toISOString()
                    .split("T")[1]
                    .split("Z")[0]
                    .split(".")[0]
                }`}
              </Text>
            </Text>
          )}
        </Box>
      </Box>
      <style jsx>{``}</style>
    </Fragment>
  );
};
