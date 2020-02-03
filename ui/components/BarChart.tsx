// Components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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
  return data.length > 0 ? (
    <ResponsiveContainer height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yAxisKeys.map((yAxisKey, index) => (
          <Bar key={index} dataKey={yAxisKey} fill={theme.colors.redLight} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  ) : null;
};
