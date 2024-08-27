import React, { useEffect, useState } from "react";
import { Card } from "../card/card";
import { Graph } from "../art-graph/graph";
import { useDispatch } from "react-redux";
import { fetchTotalUserPlaylistCreatorCount } from "@/redux/slice/fetchTotalUserPlaylistCreaterSlice";
import { SalesDataItem } from "./data-types";
import { fetchSalesCourse } from "../../../redux/slice/fetchSalesCourseSlice";
import Slider from "../slider/slider";
import DashboardTable from "./dashboard-table";
import Categories from "./categories";
import { userInformation } from "@/redux/slice/fetchAllUsersDetailSlice";

// import { FetchAllPhotographyBySellerSide } from "@/redux/slice/FetchAllPhotographyBySellerSildeSlice";
export interface DashboardCardData {
  totalCreatorCount: number;
  totalPlaylistCount: number;
  totalUserCount: number;
  totalRevenue: number;
  todayRevenue: number;
  todayUserCount: number;
  todayCreatorCount: number;
  todayPlaylistCount: number;
  todaySellerCount: number;
  todayBuyerCount: number;
  totalSellerCount: number;
  totalBuyerCount: number;
}

export const ArtMusicDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [salesCourse, setSalesCourse] = useState<SalesDataItem[]>([]);
  const [cardData, setCardData] = useState<DashboardCardData>({
    totalCreatorCount: 0,
    totalPlaylistCount: 0,
    totalUserCount: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    todayUserCount: 0,
    todayCreatorCount: 0,
    todayPlaylistCount: 0,
    todaySellerCount: 0,
    todayBuyerCount: 0,
    totalBuyerCount: 0,
    totalSellerCount: 0,
  });
  useEffect(() => {
    // if (token) {
    callApiToAllSales();
    callApiToFetchSalesCourses();
    getApiToFetchTotalUserPlaylistCreator();
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

  const getApiToFetchTotalUserPlaylistCreator = async () => {
    try {
      const result = await dispatch<any>(fetchTotalUserPlaylistCreatorCount());
        console.log(result.payload)
      if (result.payload && result.payload.data) {
        const {
          totalCreatorCount,
          totalPlaylistCount,
          totalUserCount,
          todayUserCount,
          todayCreatorCount,
          todayPlaylistCount,
          todaySellerCount,
          todayBuyerCount,
          totalSellerCount,
          totalBuyerCount,
        } = result.payload.data;
        setCardData((prevData) => ({
          ...prevData,
          totalCreatorCount,
          totalPlaylistCount,
          totalUserCount,
          todayUserCount,
          todayCreatorCount,
          todayPlaylistCount,
          todaySellerCount,
          todayBuyerCount,
          totalSellerCount,
          totalBuyerCount,
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
        <div className="w-full mt-5 lg:w-3/5">
          <Graph salesData={salesCourse} />
        </div>
        <div className="w-full lg:w-2/5">
          <Slider />
        </div>
      </div>

      <div className="w-full flex flex-col justify-between lg:flex-row gap-6 pb-5 mt-10">
        <div className="w-full lg:w-3/5">
          <DashboardTable dashboardSalesData={salesCourse} />
        </div>
        <div className="w-[95%] lg:w-2/5">
          <Categories dashboardSalesData={salesCourse} />
        </div>
      </div>
    </div>
  );
};
