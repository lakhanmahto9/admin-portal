import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";



interface SalesData {
  month: string; // Ensure this property is present
  totalSoldItems: number;
  totalRevenue: number;
}

interface ChartProps {
  year: number;
  salesData: SalesData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-500 text-white border rounded-2xl p-2">
        <p className="text-sm">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm">{`${entry.name} : ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload && payload.value > 0) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="#8884d8"
        className="block text-white"
        stroke="none"
        viewBox="0 0 1024 1024"
      >
        <circle cx={5} cy={5} r={5} fill="#82ca9d" />
      </svg>
    );
  }
  return null;
};

export const Chart: React.FC<ChartProps> = ({ year, salesData }) => {
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  return (
    <ResponsiveContainer width="98%" height={300}>
      <LineChart data={salesData}>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor={colors.text}
              floodOpacity="0.8"
            />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.text} />
        <XAxis dataKey="name" stroke={colors.text} />
        <YAxis stroke={colors.text} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: colors.text }} />
        <Line
          type="monotone"
          dataKey="totalSoldItems"
          name="Total Sold Items"
          stroke={colors.graphDraw}
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
        <Line
          type="monotone"
          dataKey="totalRevenue"
          name="Total Revenue"
          stroke="#8884d8"
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
