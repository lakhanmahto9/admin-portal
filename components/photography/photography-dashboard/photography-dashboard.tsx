import React, { useEffect } from "react";
import { Graph } from "../graph/Graph";
import { Card } from "../card/Card";
import { Gif } from "../Gif/Gif";
import { useDispatch } from "react-redux";
import { salesPhotography } from "@/redux/slice/photography/PhotographySaleSlice";

export const Photographydashboard: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        callApiToTotalSale();
    },[])

    const callApiToTotalSale = async ()=>{
        try {
            const result = await dispatch<any>(salesPhotography());
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center">
      <Card />
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-10">
        <div className="w-full lg:w-3/5">
          <Graph />
        </div>
        <div className="w-full lg:w-2/5"><Gif /></div>
      </div>

      {/* <div className="w-full flex flex-col lg:flex-row gap-6 pb-5 mt-10">
        <div className="w-full lg:w-3/5">
          <Sale />
        </div>
        <div className="w-full lg:w-2/5">
          <Categories />
        </div>
      </div> */}
    </div>
  );
};
