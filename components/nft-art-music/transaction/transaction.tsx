import { BackArrow } from "@/components/utils/icons";
import React from "react";
import { SalesDataItemTwo } from "../art-dashboard/data-types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useThemeColors } from "@/components/utils/useThemeColor";

export const ArtMusicTransaction: React.FC = () => {
  const router = useRouter();
  const [dataItem, setDataItem] = useState<SalesDataItemTwo | null>(null);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      console.log("Query parameters:", query);
      const item: SalesDataItemTwo = {
        countryName: query.countryName as string,
        courseID: query.courseID as string,
        createdAt: query.createdAt as string,
        creatorId: query.creatorId as string,
        orderId: query.orderId as string,
        price: query.price as string,
        artThumbnail: query.artThumbnail as string,
        musicThumbnail: query.musicThumbnail as string,
        artName: query.artName as string,
        name: query.name as string,
        type: query.type as string,
      };

      setDataItem(item);
    }
  }, [router.isReady, router.query]);

  const gotoDashboard = () => {
    router.push("/admin-dashboard/seller-art/art-dashboard");
  };

  return (
    <div
      className={`px-4 lg:mt-10 w-full lg:h-[60%] h-[85%] sm:h-[80%] md:h-[60%]    bg-slate-100 rounded-xl ${
        darkModeEnable
          ? "shadow-md shadow-gray-700"
          : "shadow-md shadow-gray-300"
      }`}
      style={{ background: colors.cardBg, color: colors.text }}
    >
      <div className={`h-18 rounded-xl `}>
        <div className="flex justify-start px-2 py-6">
          <div onClick={gotoDashboard} className="cursor-pointer">
            <BackArrow color={colors.text} width="28" height="28" />
          </div>
          <p className={`font-semibold text-lg ml-4`}>Transaction</p>
        </div>
      </div>

      <div className=" w-full h-[80%] flex justify-between sm:justify-start flex-col md:flex-row gap-2">
        <div className={`lg:w-[60%] w-full h-full md:w-[60%] sm:h-[40%] px-2 py-4 rounded-lg flex flex-col gap-2 `}
        >
          <div className="flex justify-between px-3">
            <p>Art/Music Name</p>
            <p className="font-bold">{dataItem?.artName}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Price</p>
            <p className="font-bold text-blue-700">₹{dataItem?.price}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Order ID</p>
            <p>{dataItem?.orderId}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>User Name</p>
            <p>{dataItem?.name}</p>
          </div>
          <div className="flex justify-between px-3">
            <p>Purchase Date</p>
            <p className="font-bold">{moment(dataItem?.createdAt).format("MMMM Do YYYY")}</p>
          </div>
          {/* <div className="flex justify-between px-3">
            <p>Country</p>
            <p>{dataItem?.countryName}</p>
          </div> */}
        </div>
        <div className={`flex justify-center lg:w-[40%] w-full lg:h-full h-[70%] md:w-[40%]  md:h-[80%] sm:h-[70%]  p-2 rounded-lg `}>
          <img
            src={dataItem?.artThumbnail || dataItem?.musicThumbnail}
            alt=""
            className="w-full h-full lg:w-[90%] object-fill "
          />
        </div>
      </div>
    </div>
  );
};
