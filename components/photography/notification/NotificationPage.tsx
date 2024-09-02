import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { PersonIcon } from "@/public/icons/icons";

export const NotificatonPage: React.FC = () => {
//   const mysale = useSelector((state: any) => state.sales.data?.mysale || []);
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-1 p-4">
      {/* {mysale.map((item:any,index:number) => (
        <div className="w-full flex border-b-2 border-[#aebffa] h-16 gap-2 p-1 ">
          <div>
            <PersonIcon color="#aebffa" width="28" height="28" />
          </div>
          <p className="text-sm text-[#436bfb]">
            Your photography's name is {item?.title} is sell on {moment(item.createdAt).format("MMMM Do, YYYY")}
          </p>
        </div>
      ))} */}
      
    </div>
  );
};
