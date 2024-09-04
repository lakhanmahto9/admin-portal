import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "./chart";
import { SalesDataItemTwo } from "../art-dashboard/data-types";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface GraphProps {
    salesData: SalesDataItemTwo[];  // Changed to an array of SalesDataItem
}

export const Graph: React.FC<GraphProps> = ({ salesData }) => {
    console.log(salesData)
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const lastPrevYear = previousYear - 1;
    setYears([currentYear, previousYear, lastPrevYear]);
    setSelectedYear(currentYear);
  }, []);

  const handleChangeyear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  

  return (
    <div
      className={`w-full h-96 mt-5 rounded-2xl p-4 shadow-md `}
      style={{background:colors.cardBg}}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold" style={{ color: colors.text }}>
            Sales Overview
          </p>
          <p className={``} style={{color:colors.text}}>
            <span className="text-[#5df334]">5%</span> more in 2021
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-[#a9bac1dc] rounded-xl"
            style={{ background: colors.cardBg, color:colors.text }}
            onChange={handleChangeyear}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Chart year={selectedYear} salesData={salesData}  />
      </div>
    </div>
  );
};
