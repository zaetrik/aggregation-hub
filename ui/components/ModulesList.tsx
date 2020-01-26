import { Dispatch, SetStateAction, Fragment } from "react";
import { Box, Heading, Button, ResponsiveContext, Grid } from "grommet";
import { DataModule } from "../types/dataModule";
import Link from "next/link";
import DeleteModule from "./DeleteModule";
import * as Icons from "grommet-icons";

const ModulesList = ({
  modules,
  setModulesState
}: {
  modules: DataModule[];
  setModulesState: Dispatch<SetStateAction<DataModule[]>>;
}) => {
  return (
    <Fragment>
      <ResponsiveContext.Consumer>
        {size => {
          if (modules) {
            const areas = modules.map((module, index) => {
              return {
                name: `${module.id}`,
                start: [0, index],
                end: [0, index]
              };
            });

            const rows = modules.map(module => {
              return "1fr";
            });

            const columns = ["1fr"];

            return (
              <Grid
                rows={rows}
                alignSelf="center"
                columns={columns}
                fill
                style={{
                  minHeight: "100%",
                  width: "100%"
                }}
                gap="small"
                areas={areas}
              >
                {modules.length > 0 ? (
                  <Box pad="medium">
                    <Heading size="xxsmall">Modules</Heading>
                    {modules.map((module, index) => {
                      return (
                        <Box
                          margin="small"
                          key={index}
                          round
                          animation="fadeIn"
                          background="brand"
                        >
                          <Link href={`/modules/${module.id}`} key={index}>
                            <Heading
                              textAlign="start"
                              alignSelf="start"
                              margin="medium"
                              className="cursor-pointer"
                            >
                              {module.name}
                            </Heading>
                          </Link>
                          <Box direction="row">
                            <DeleteModule
                              modules={modules}
                              module={module}
                              setModulesState={setModulesState}
                            ></DeleteModule>
                            <Button
                              alignSelf="end"
                              margin="small"
                              icon={<Icons.PieChart />}
                              label="Go to Dashboard"
                              hoverIndicator
                              onClick={() =>
                                (location.href =
                                  "http://localhost:5601/app/kibana#/discover")
                              }
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ) : null}
              </Grid>
            );
          }
        }}
      </ResponsiveContext.Consumer>
    </Fragment>
  );
};

export default ModulesList;
