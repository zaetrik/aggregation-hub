import Layout from "../components/Layout";
import { Heading, Grid, Box, ResponsiveContext } from "grommet";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <Box fill pad="small">
        <ResponsiveContext.Consumer>
          {size => {
            const areas = [
              {
                name: "modules",
                start: [0, 0],
                end: [0, 0]
              },
              {
                name: "dashboard",
                start: [1, 0],
                end: [1, 0]
              }
            ];

            const rows = ["1fr"];
            const columns = ["1fr", "1fr"];

            return (
              <Grid
                rows={rows}
                alignSelf="center"
                columns={columns}
                fill
                style={{
                  minHeight: "100%"
                }}
                gap="small"
                areas={areas}
              >
                <Link href={`/modules`}>
                  <Box
                    animation="fadeIn"
                    gridArea={"modules"}
                    justify="center"
                    background="brand"
                    className="cursor-pointer"
                  >
                    <Heading textAlign="center" alignSelf="center">
                      Modules
                    </Heading>
                  </Box>
                </Link>
                <Box
                  animation="fadeIn"
                  gridArea={"dashboard"}
                  justify="center"
                  background="brand"
                  className="cursor-pointer"
                  onClick={() =>
                    (location.href =
                      "http://localhost:5601/app/kibana#/discover")
                  }
                >
                  <Heading textAlign="center" alignSelf="center">
                    Dashboard
                  </Heading>
                </Box>
              </Grid>
            );
          }}
        </ResponsiveContext.Consumer>
      </Box>
    </Layout>
  );
};

export default Index;
