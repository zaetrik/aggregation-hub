import theme from "../theme";

// Components
import { Resizable } from "re-resizable";
import Card from "./Card";

export default ({
  chart,
  title,
  subHeading
}: {
  chart: JSX.Element;
  title?: string;
  subHeading?: string;
}) => {
  return (
    <Resizable
      maxWidth="100%"
      defaultSize={{
        width: "45%",
        height: "auto"
      }}
      style={{
        marginLeft: theme.margin.medium,
        marginRight: theme.margin.medium
      }}
    >
      <Card
        hover={false}
        justifyContent="center"
        title={title ? title : ""}
        subHeading={subHeading ? subHeading : ""}
      >
        {chart}
      </Card>
    </Resizable>
  );
};
