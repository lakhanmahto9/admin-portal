import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { CheckIcon, PersonIcon } from "@/public/icons/icons";
import { CheckDoubleIcon } from "@/components/utils/icons";

export const NotificatonPage: React.FC = () => {
  const totalsell = useSelector((state: any) => state.sale?.data?.sells || []);
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-1 p-4">
      {totalsell.map((item: any, index: number) => (
        <div className="w-full border-b-2 border-[#aebffa] h-24 p-1" key={index}>
        <div className="flex gap-2">
          <div className="w-14 h-8">
            <img
              src={item?.thumbnail}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-sm text-[#436bfb]">
            Photography's name is {item?.title} is purchased by{" "}
            {item?.buyerId?.name} on{" "}
            {moment(item.createdAt).format("MMMM Do, YYYY")}
          </p>
        </div>
        <p className="flex justify-end">
          {item?.adminSeen ?<CheckDoubleIcon color="#0e87f1" width="20" height="20"/> : <CheckIcon color="#858e98" width="20" height="20" />}
        </p>
      </div>
      ))}
    </div>
  );
};
