import React, { useEffect } from "react";
import { Graph } from "../graph/Graph";
import { Card } from "../card/Card";
import { Gif } from "../Gif/Gif";
import { useDispatch } from "react-redux";
import { salesPhotography } from "@/redux/slice/photography/PhotographySaleSlice";
import { getAllSeller } from "@/redux/slice/photography/AllPhSellerSlice";
import { AllBuyer } from "@/redux/slice/photography/AllBuyerSlice";
import { Transaction } from "../transaction/Transaction";

export const Photographydashboard: React.FC = () => {
  const dispatch = useDispatch();

  const callApiToTotalSale = async () => {
    try {
      const result = await dispatch<any>(salesPhotography());
      console.log(result.payload)
    } catch (error) {
      console.log(error);
    }
  };
  const callApiTogetAllPhSeller = async () => {
    try {
      const result = await dispatch<any>(getAllSeller());
    } catch (error) {
      console.log(error);
    }
  };
  const callApiTogetAllBuyer = async () => {
    try {
      const result = await dispatch<any>(AllBuyer());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callApiToTotalSale();
    callApiTogetAllPhSeller();
    callApiTogetAllBuyer();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <Card />
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-10">
        <div className="w-full lg:w-3/5">
          <Graph />
        </div>
        <div className="w-full lg:w-2/5">
          <Gif />
        </div>
      </div>
      <div className="w-full mt-10">
        <Transaction/>
      </div>
    </div>
  );
};
