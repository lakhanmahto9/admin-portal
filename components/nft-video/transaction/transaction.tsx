import { BackArrow } from "@/components/utils/icons";
import React from "react";
import { SalesDataItem } from "../video-dashboard/data-types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { selectDarkMode } from "@/redux/slice/darkModeSlice";

export const TransactionAdmin: React.FC = () => {
  const router = useRouter();
  const [dataItem, setDataItem] = useState<SalesDataItem | null>(null);
//   const darkModeEnabled = useSelector(selectDarkMode);

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      const item: SalesDataItem = {
        countryName: query.countryName as string,
        courseID: query.courseID as string,
        createdAt: query.createdAt as string,
        creatorId: query.creatorId as string,
        orderId: query.orderId as string,
        price: query.price as string,
        thumbnail: query.thumbnail as string,
        title: query.title as string,
        userName: query.userName as string,
      };

      setDataItem(item);
    }
  }, [router.isReady, router.query]);

  const gotoDashboard = () => {
    router.push("/seller-video/seller-dashboard");
  };

  return (
    <div className="px-4 mt-10 ml-5 bg-slate-100 rounded-xl shadow-md shadow-gray-300">
      <div
        className={`h-18 rounded-xl `}
      >
        <div className="flex justify-start px-4 py-6">
          <div onClick={gotoDashboard} className="cursor-pointer">
            <BackArrow
              color= "black"
              width="28"
              height="28"
            />
          </div>
          <p
            className={`font-semibold text-lg ml-4`}
          >
            Transaction
          </p>
        </div>
      </div>

      <div className="mt-10 w-full flex flex-col lg:flex-row gap-2">
        <div
          className={`lg:w-3/5 w-full h-auto px-2 py-4 rounded-lg flex flex-col gap-2 `}
        >
          <div className="flex justify-between px-3">
            <p>Course Name</p>
            <p>{dataItem?.title}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Price</p>
            <p>₹{dataItem?.price}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Order Id</p>
            <p>{dataItem?.orderId}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>User Name</p>
            <p>{dataItem?.userName}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Subscription date</p>
            <p>{moment(dataItem?.createdAt).format("MMMM Do YYYY")}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Country</p>
            <p>{dataItem?.countryName}</p>
          </div>
        </div>
        <div
          className={`lg:w-2/5 w-full h-auto p-2 rounded-lg `}
        >
          <img
            src={dataItem?.thumbnail}
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};
