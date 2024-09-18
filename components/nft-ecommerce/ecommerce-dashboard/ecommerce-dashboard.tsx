import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../card/card";
import { Graph } from "../ecommerce-graph/graph";
import { getEcommerceCardDataThunk } from "@/redux/slice/ecommerce/getEcommerceCardDataSlice";
import { getEcommerceMonthlySalesData } from "../../../redux/api/ecommerce/dashboardApi";
import Slider from "../slider/slider";
import DashboardTable from "./dashboard-table";
import Categories from "./categories";
import { AppDispatch } from '@/redux/store/store'; // Adjust the import path as necessary

export interface DashboardCardData {
  todayProducts: number;
  todaySellers: number;
  todayBuyers: number;
  totalProducts: number;
  totalSellers: number;
  totalBuyers: number;
}

interface SalesData {
  month: string;
  totalSoldItems: number;
  totalRevenue: number;
}

const EcommerceDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [salesProduct, setSalesProduct] = useState<SalesData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [cardData, setCardData] = useState<DashboardCardData>({
    todayProducts: 0,
    todaySellers: 0,
    todayBuyers: 0,
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
  });

  useEffect(() => {
    callApiToFetchSalesProducts(selectedYear);
    callApiToGetEcommerceCardData();
  }, [selectedYear]);

  const callApiToGetEcommerceCardData = async () => {
    try {
      const result = await dispatch(getEcommerceCardDataThunk()) as { payload: DashboardCardData };
      if (result.payload) {
        setCardData(result.payload);
      }
    } catch (error) {
      console.error("Failed to fetch card data", error);
    }
  };

  const callApiToFetchSalesProducts = async (year: number) => {
    try {
      const result = await getEcommerceMonthlySalesData(year);
      if (result && result.data) {
        setSalesProduct(result.data.data || []); // Ensure data matches expected format
      }
    } catch (error) {
      console.error("Failed to fetch sales data", error);
      setSalesProduct([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card data={cardData} />
      <div className="w-full flex flex-col justify-center lg:flex-row gap-6 mt-10 pb-10">
        <div className="w-full mt-10 ">
          <Graph salesData={salesProduct} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        </div>
        {/* <div className="w-full flex justify-center items-center lg:w-2/5">
          <Slider />
        </div> */}
      </div>

      <div className="w-full flex flex-col justify-between lg:flex-row gap-6 pb-5 mt-10">
        {/* <div className="w-full lg:w-3/5">
          <DashboardTable dashboardSalesData={salesProduct} />
        </div>
        <div className="w-full lg:w-2/5">
          <Categories dashboardSalesData={salesProduct} />
        </div> */}
      </div>
    </div>
  );
};

export default EcommerceDashboard;
