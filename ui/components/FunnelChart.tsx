import theme from "../theme";

// Components
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default ({
  data
}: {
  data: { name: string; value: string | number }[];
}) => {
  return (
    <ResponsiveContainer height={300}>
      <FunnelChart>
        <Tooltip />
        <Funnel
          fill={theme.colors.green}
          dataKey="value"
          data={data}
          isAnimationActive
        >
          <LabelList
            position="right"
            fill={theme.fonts.headingColor}
            stroke="none"
            dataKey="name"
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
};
