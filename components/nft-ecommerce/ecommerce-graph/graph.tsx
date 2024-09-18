import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "./chart";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface SalesData {
  month: string;
  totalSoldItems: number;
  totalRevenue: number;
}

interface GraphProps {
  salesData: SalesData[];
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const Graph: React.FC<GraphProps> = ({ salesData, selectedYear, setSelectedYear }) => {
  console.log(salesData, "salesdata");
  const [years, setYears] = useState<number[]>([]);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const lastPrevYear = previousYear - 1;
    setYears([currentYear, previousYear, lastPrevYear]);
  }, []);

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div
      className="w-full h-96 rounded-2xl p-4 shadow-md"
      style={{ background: colors.cardBg }}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold" style={{ color: colors.text }}>
            Sales Overview
          </p>
          <p style={{ color: colors.text }}>
            <span className="text-[#5df334]">5%</span> more in {selectedYear}
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-[#a9bac1dc] rounded-xl"
            style={{ background: colors.cardBg, color: colors.text }}
            onChange={handleChangeYear}
            value={selectedYear}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Chart year={selectedYear} salesData={salesData} />
      </div>
    </div>
  );
};
