// Components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import theme from "../theme";

export default ({
  data,
  yAxisKeys,
  xAxisKey
}: {
  yAxisKeys: string[];
  xAxisKey: string;
  data: { [field: string]: any }[];
}) => {
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {yAxisKeys.map((yAxisKey, index) => (
        <Bar key={index} dataKey={yAxisKey} fill={theme.colors.red} />
      ))}
    </BarChart>
  );
};
