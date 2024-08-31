import React, { useEffect, useState } from "react";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { useSelector } from "react-redux";
import { PhotoIcon, UserIcon } from "@/public/icons/icons";
import { RupeesIcon } from "@/components/utils/icons";

export const Card: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const totalseller = useSelector((state: any) => state.phseller?.data?.phseller || []);
  const totalbuyer = useSelector((state: any) => state.buyer?.data?.buyer || []);
  const photographysale = useSelector((state:any)=> state.sale.data?.sells || [])
  const [info, setInfo] = useState({
    totalRevenue: 0,
    todayRevenue: 0,
  });

  useEffect(() => {
    callFilterFunction();
  }, []);

  const callFilterFunction = () => {
    if (photographysale.length > 0) {
      const totalRev = photographysale.reduce((total: number, data: any) => {
        return total + data.price;
      }, 0);
      console.log("hiii")

      setInfo((prev) => ({
        ...prev,
        totalRevenue: totalRev,
      }));
      const currentDate = new Date();
      const filterSale = photographysale.filter((item: any) => {
        const itemDate = new Date(item.createdAt);
        return (
          itemDate.getFullYear() === currentDate.getFullYear() &&
          itemDate.getMonth() === currentDate.getMonth() &&
          itemDate.getDate() === currentDate.getDate()
        );
      });
      setInfo((prev) => ({
        ...prev,
        todayRevenue: filterSale.reduce(
          (acc: number, data: any) => (acc = acc + data.price),
          0
        ),
      }));
    }
  };

  const bg = useThemeColors(isDarkEnabled);
  const cardStyle = {
    backgroundColor: `${bg.cardBg}`,
    border: `1px solid "#192555"`,
    color: "#3C4E6D",
  };
  return (
    <div className="w-full flex flex-wrap justify-between gap-3">
      <div
        className={`w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 `}
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className={`text-sm font-semibold text-[${bg.text}]`}>
              Total Seller
            </p>
            <p className={`text-xl font-bold text-[${bg.text}]`}>
              {totalseller.length}
            </p>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex  justify-center items-center"
              id="bg-round"
            ></div>
            <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
              <UserIcon color="#22219a" height="18" width="18" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className={`text-[${bg.text}]`}>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className={`text-sm font-semibold text-[${bg.text}]`}>
              Total Buyer
            </p>
            <p className={`text-xl font-bold text-[${bg.text}]`}>
              {totalbuyer.length}
            </p>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex  justify-center items-center"
              id="bg-round"
            ></div>
            <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
              <UserIcon color="#22219a" height="18" width="18" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className={`text-[${bg.text}]`}>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28  rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className={`text-sm font-semibold text-[${bg.text}]`}>
              Total Revenue
            </p>
            <p className={`text-xl font-bold text-[${bg.text}]`}>
              ₹{info.totalRevenue}
            </p>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex  justify-center items-center"
              id="bg-round"
            ></div>
            <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
              <RupeesIcon color="#22219a" height="18" width="18" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className={`text-[${bg.text}]`}>since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className={`text-sm font-semibold text-[${bg.text}]`}>
              Today&apos;s Revenue
            </p>
            <p className={`text-xl font-bold text-[${bg.text}]`}>
            ₹{info.todayRevenue}
            </p>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex  justify-center items-center"
              id="bg-round"
            ></div>
            <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
              <RupeesIcon color="#22219a" height="18" width="18" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className={`text-[${bg.text}]`}>since last year</p>
        </div>
      </div>
    </div>
  );
};
