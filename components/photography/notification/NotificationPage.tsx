import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { PersonIcon } from "@/public/icons/icons";

export const NotificatonPage: React.FC = () => {
  const totalsell = useSelector((state: any) => state.sale?.data?.sells || []);
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-1 p-4">
      {totalsell.map((item: any, index: number) => (
        <div
          key={index}
          className="w-full flex border-b-2 border-[#aebffa] h-16 gap-2 p-1 "
        >
          <div className="w-14 h-9">
            <img
              src={item?.thumbnail}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
            {/* <PersonIcon color="#aebffa" width="28" height="28" /> */}
          </div>
          <p className="text-sm text-[#436bfb]">
            Photography&apos;s name is {item?.title} is purchasd by{" "}
            {item?.buyerId?.name} on{" "}
            {moment(item.createdAt).format("MMMM Do, YYYY")}
          </p>
        </div>
      ))}
    </div>
  );
};
