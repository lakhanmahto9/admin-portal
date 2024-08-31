import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { Chart } from "./Chart";

export const Graph: React.FC = () => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const bg = useThemeColors(isDarkEnabled);


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
      className={`w-full h-96  rounded-2xl p-4 ${
        isDarkEnabled ? "bg-[#111c44] border border-[#D3D3D3]" : "bg-[#fff]"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold" style={{ color: "#ccc" }}>
            Sales Overview
          </p>
          <p className={`${isDarkEnabled ? "text-[#D3D3D3]" : "text-[#717d95]"}`}>
            <span className="text-[#5df334]">5%</span> more in {selectedYear-1}
          </p>
        </div>
        <div>
          <select
            className="w-40 h-10 border border-[#a9bac1dc] rounded-xl outline-none"
            style={{ background: `${bg.background}`, color: `${bg.text}` }}
            onChange={handleChangeyear}
          >
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Chart year={selectedYear}/>
      </div>
    </div>
  );
};
