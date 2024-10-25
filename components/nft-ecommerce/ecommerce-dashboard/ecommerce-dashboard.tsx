import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../card/card";
import { Graph } from "../ecommerce-graph/graph";
import { getEcommerceCardDataThunk } from "@/redux/slice/ecommerce/getEcommerceCardDataSlice";
import { getEcommerceMonthlySalesData, getEcommerceSalesDetails, getEcommerceTransactions } from "../../../redux/api/ecommerce/dashboardApi";
import DashboardTable from "./dashboard-table";
import Categories from "./categories";
import { AppDispatch } from '@/redux/store/store'; // Adjust the import path as necessary
import Transaction from "../transaction/Transaction";

export interface DashboardCardData {
  todayProducts: number;
  todaySellers: number;
  todayBuyers: number;
  totalProducts: number;
  totalSellers: number;
  totalBuyers: number;
  newBuyers:number;
  newSellers:number;
  newProducts:number;
  buyersPercentageChange:number;
  sellersPercentageChange:number;
  productsPercentageChange:number;

}

interface SalesData {
  month: string;
  totalSoldItems: number;
  totalRevenue: number;
}

interface SalesDetails {
  username: string;
  productName: string;
  date: Date;
  country: string;
  price: number;
  quantity: number;
}

interface Transaction {
  productName: string;
  price: number;
  photo: string;
  itemId: string; // Ensure itemsId is included here
}

const EcommerceDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [salesDetails, setSalesDetails] = useState<SalesDetails[]>([]);
  const [salesProduct, setSalesProduct] = useState<SalesData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [cardData, setCardData] = useState<DashboardCardData>({
    todayProducts: 0,
    todaySellers: 0,
    todayBuyers: 0,
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
    newBuyers:0,
    newSellers:0,
    newProducts:0,
    buyersPercentageChange:0,
    sellersPercentageChange:0,
    productsPercentageChange:0,
  });

  useEffect(() => {
    callApiToFetchSalesProducts(selectedYear);
    callApiToGetEcommerceCardData();
    callApiToFetchSalesDetails();
    callApiToFetchTransactions();
  }, [selectedYear]);

  const callApiToGetEcommerceCardData = async () => {
    try {
      const result = await dispatch(getEcommerceCardDataThunk()) ;

      console.log(result, 68)
      if (result.payload) {
        setCardData(result.payload.data);
      }
    } catch (error) {
      console.error("Failed to fetch card data", error);
    }
  };

  const callApiToFetchSalesProducts = async (year: number) => {
    try {
      const result = await getEcommerceMonthlySalesData(year);
      if (result && result.data) {
        setSalesProduct(result.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch sales data", error);
      setSalesProduct([]);
    }
  };

  const callApiToFetchSalesDetails = async () => {
    try {
      const result = await getEcommerceSalesDetails();
      if (result && result.data) {
        setSalesDetails(result.data.data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch sales details", error);
    }
  };


  

  const callApiToFetchTransactions = async () => {
    try {
      const result = await getEcommerceTransactions();
      if (result && result.data) {
        // Flatten the transactions data to handle individual items
        const flattenedTransactions = result.data.data.flatMap((order: any) => 
          order.items.map((item: any) => ({
            ...item,
            itemId: item.itemId // Ensure itemId is mapped to itemsId
          }))
        );
        setTransactions(flattenedTransactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card data={cardData} />
      <div className="w-full flex flex-col justify-center lg:flex-row gap-6 mt-10 pb-10">
        <div className="w-full mt-10">
          <Graph salesData={salesProduct} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        </div>
      </div>

      {/* <div className="w-full flex flex-col justify-between lg:flex-row gap-6 pb-5 mt-10">
        <div className="w-full lg:w-3/5">
          <DashboardTable salesDetails={salesDetails} />
        </div>
        <div className="w-full lg:w-2/5 mt-2">
          <Categories transactions={transactions} />
        </div>
      </div> */}
      <div className="my-8 w-full">
        <Transaction/>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
