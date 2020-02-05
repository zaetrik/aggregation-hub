import theme from "../theme";

// Components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default ({
  data,
  lines
}: {
  data: { name: string; value: string | number }[];
  lines: { dataKey: string }[];
}) => {
  return (
    <ResponsiveContainer height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => {
          return (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={theme.colors.red}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
