import React, { useEffect, useState } from "react";
import { Chart } from "./chart";
import { SalesDataItem } from "../video-dashboard/data-types";

interface GraphProps {
    salesData: SalesDataItem[];  // Changed to an array of SalesDataItem
}

export const Graph: React.FC<GraphProps> = ({ salesData }) => {
    console.log(salesData)
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);

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
      className={`w-full h-96  rounded-2xl p-4 shadow-md ${
        false ? "bg-[#111c44] border border-[#D3D3D3]" : "bg-[#fff]"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold" style={{ color: "" }}>
            Sales Overview
          </p>
          <p className={`${false ? "text-[#D3D3D3]" : "text-[#717d95]"}`}>
            <span className="text-[#5df334]">5%</span> more in 2021
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-[#a9bac1dc] rounded-xl"
            style={{ background: "#fff", color: "#192555" }}
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
