import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { SalesDataItem } from "../video-dashboard/data-types";

interface ChartProps {
  year: number;
  salesData: SalesDataItem[]; // Accepting salesData as a prop
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

  if (payload.value > 0) {
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
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    filterData();
  }, [year, salesData]);

  const filterData = () => {
    // Filter sales data by the selected year
    const filtered = salesData.filter((item) =>
      moment(item.createdAt).year() === year
    );

    // Initialize monthly data with zero values
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: moment().month(i).format("MMM"),
      courses: 0, // You might count the number of courses created or purchased
    }));

    // Aggregate sales data by month
    filtered.forEach((item) => {
      const month = moment(item.createdAt).month();
      monthlyData[month].courses += 1; // Increment the count for the respective month
    });

    setFilteredData(monthlyData);
  };

  return (
    <ResponsiveContainer width="98%" height={300}>
      <LineChart data={filteredData}>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="#5E72E4"
              floodOpacity="0.8"
            />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#333" />
        <YAxis stroke="#333" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: "#000" }} />
        <Line
          type="monotone"
          dataKey="courses"
          name="Courses"
          stroke="#5E72E4"
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
