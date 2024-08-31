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
// import { useSelector } from "react-redux";
// import { useThemeColors } from "@/components/utils/useThemeColor";
import moment from "moment";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";


interface LineChartProps {
  year: number;
  isDarkEnabled: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-500 text-white border rounded-2xl p-2">
        <p className="text-sm">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm"
          >{`${entry.name} : ${entry.value}`}</p>
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

const art = [
  { name: "Jan", art: 8, music: 10 },
  { name: "Feb", art: 20, music: 18 },
  { name: "Mar", art: 10, music: 9 },
  { name: "Apr", art: 2, music: 5 },
  { name: "May", art: 4, music: 7 },
  { name: "Jun", art: 5, music: 8 },
  { name: "Jul", art: 15, music: 10 },
  { name: "Aug", art: 5, music: 8 },
  { name: "Sep", art: 23, music: 20 },
  { name: "Oct", art: 18, music: 17 },
  { name: "Nov", art: 12, music: 16 },
  { name: "Dec", art: 9, music: 12 },
];

interface selectYear{
  year:number
}

export const Chart: React.FC<selectYear> = ({year}) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const totalsell = useSelector((state: any) => state.sale?.data?.sells || []);
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const bg = useThemeColors(isDarkEnabled);
  console.log(year)

    useEffect(()=>{
      filterData();
    },[year]);

  const filterData = () => {
    const filtered = totalsell.filter((item: any) =>
      moment(item.createdAt).year() === year
    );
  
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: moment().month(i).format("MMM"),
      photography: 0,
    }));
  
    filtered.forEach((item: any) => {
      const month = moment(item.createdAt).month();
      monthlyData[month].photography += 1;
    });
    setFilteredData(monthlyData);
    console.log(monthlyData)
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
        <XAxis dataKey="name" stroke={`${bg.text}`} />
        <YAxis stroke={`${bg.text}`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: "#000" }} />
        <Line
          type="monotone"
          dataKey="photography"
          name="Photography"
          stroke="#025f92"
          strokeWidth={3}
          dot={<CustomDot />}
          filter="url(#shadow)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
