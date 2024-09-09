import React, { useEffect, useState } from "react";
import { Card } from "../card/card";
import { Graph } from "../ecommerce-graph/graph";
import { useDispatch } from "react-redux";
import { getEcommerceCardDataThunk } from "@/redux/slice/ecommerce/getEcommerceCardDataSlice";
import { SalesDataItem } from "./data-types";
import { fetchSalesCourse } from "../../../redux/slice/fetchSalesCourseSlice";
import Slider from "../slider/slider";
import DashboardTable from "./dashboard-table";
import Categories from "./categories";
import { userInformation } from "@/redux/slice/fetchAllUsersDetailSlice";

// import { FetchAllPhotographyBySellerSide } from "@/redux/slice/FetchAllPhotographyBySellerSildeSlice";
export interface DashboardCardData {
  todayProducts:number,
  todaySellers:number,
  todayBuyers:number,
  totalProducts:number,
  totalSellers:number,
  totalBuyers:number,
 
}

 const EcommerceDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [salesCourse, setSalesCourse] = useState<SalesDataItem[]>([]);
  const [cardData, setCardData] = useState<DashboardCardData>({
    todayProducts:0,
    todaySellers:0,
    todayBuyers:0,
    totalProducts:0,
    totalSellers:0,
    totalBuyers:0,
   
  });
  useEffect(() => {
    // if (token) {
    callApiToAllSales();
    callApiToFetchSalesCourses();
    callApiToGetEcommerceCardData();
    getAllPlaylistForSlider();
    //   dispatch<any>(FetchAllPhotographyBySellerSide());
    // }
  }, []);

  const callApiToAllSales = async () => {
    try {
      //   await dispatch<any>(FetchAllSale());
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPlaylistForSlider = async () => {
    try {
      await dispatch<any>(userInformation());
    } catch (error) {
      console.log(error);
    }
  };

  const callApiToGetEcommerceCardData = async () => {
    try {
      const result = await dispatch<any>(getEcommerceCardDataThunk());
        console.log(result.payload)

      

      if (result.payload && result.payload.data) {
        const {
          todayProducts,
          todaySellers,
          todayBuyers,
          totalProducts,
          totalSellers,
          totalBuyers,
         
        } = result.payload.data;

        console.log(totalBuyers, "9000000")


        setCardData((prevData) => ({
          ...prevData,
          todayProducts,
          todaySellers,
          todayBuyers,
          totalProducts,
          totalSellers,
          totalBuyers,
         
        
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callApiToFetchSalesCourses = async () => {
    try {
      const result = await dispatch<any>(fetchSalesCourse({}));
      console.log(result.payload.data);
      if (result.payload && result.payload.data) {
        const salesData: SalesDataItem[] = result.payload.data.courses; // Assuming the courses are in result.payload.data.courses
        setSalesCourse(salesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card data={cardData} />
      <div className="w-full flex flex-col justify-center lg:flex-row gap-6 mt-10 pb-10">
        <div className="w-full mt-10 lg:w-3/5">
          <Graph salesData={salesCourse} />
        </div>
        <div className="w-full flex justify-center items-center lg:w-2/5">
          <Slider />
        </div>
      </div>

      <div className="w-full flex flex-col justify-between lg:flex-row gap-6 pb-5 mt-10">
        <div className="w-full lg:w-3/5">
          <DashboardTable dashboardSalesData={salesCourse} />
        </div>
        <div className="w-full lg:w-2/5">
          <Categories dashboardSalesData={salesCourse} />
        </div>
      </div>
    </div>
  );
};
export default EcommerceDashboard
