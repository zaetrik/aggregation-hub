// Components
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import theme from "../theme";

export default ({
  data
}: {
  data: { name: string; value: string | number }[];
}) => {
  return (
    <ResponsiveContainer height={300}>
      <RadialBarChart
        innerRadius="10%"
        outerRadius="80%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ fill: "#666", position: "insideStart" }}
          clockWise={true}
          fill={theme.colors.blueLight}
          background
          dataKey="value"
        />

        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
