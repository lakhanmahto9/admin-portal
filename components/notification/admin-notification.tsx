import { Notification } from "@/components/utils/icons";
import { Badge, Tooltip } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
// import TimeAgo from "../VideoFrame/TimeAgo";
import { useDispatch } from "react-redux";
import { DisabledNotification } from "@/redux/slice/disabledNotificationSlice";
import { fetchSalesCourse } from "@/redux/slice/fetchSalesCourseSlice";
import moment from 'moment';

interface SaleCourse {
  seen: boolean;
  userName: string;
  thumbnail: string;
  price: number;
  title: string;
  createdAt: string;
}

export const AdminNotification: React.FC = () => {
  const saleData = useSelector((state: any) => state?.user?.sale) || [];
  const artAndMusicSalesData =
    useSelector((state: any) => state?.user?.artAndMusicSales) || [];
  const type = useSelector((state: any) => state.open.type);
  console.log(artAndMusicSalesData);
  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  //   const sidebarMode = useSelector((state: any) => state.sidebarMode.isEnabled);
  const [saleNumber, setSaleNumber] = useState(0);
  const [saleArtMusicNumber, setSaleArtMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (type === "Tutorial" && saleData?.length > 0) {
      const data = saleData.filter((item: any) => item.seen === true);
      setSaleNumber(data.length);
    } else if (
      type === "Digital Art and Music" &&
      artAndMusicSalesData?.length > 0
    ) {
      const data = artAndMusicSalesData.filter(
        (item: any) => item.seen === true
      );
      setSaleNumber(data.length);
    }
  }, [type, saleData, artAndMusicSalesData]);

  const openNotificationModal = () => {
    setOpen(!open);
  };

  const handleClickOutside = async (event: MouseEvent) => {
    try {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        // const result = await dispatch<any>(DisabledNotification());
        // if (result?.payload?.status) {
        //   let data = {
        //     id: localStorage.getItem("creatorId"),
        //   };
        //   const result = await dispatch<any>(fetchSalesCourse(data));
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Tooltip title="Notification">
        <Badge
          // badgeContent={saleNumber}
          color="secondary"
          onClick={openNotificationModal}
        >
          <Notification color="white" width="20" height="20" />
        </Badge>
      </Tooltip>
      {open && (
        <div className="flex relative">
          <div
            ref={modalRef}
            className={`fixed z-50 top-20 right-6 sm:right-10 h-[88vh] w-[calc(100%-2.5rem)] sm:w-1/4 rounded-2xl shadow-2xl ${
              darkModeEnabled ? "bg-[#0E1A49]" : "bg-white"
            }`}
          >
            <div className="p-4 h-full">
              <div
                className={`w-full h-14 rounded-2xl mb-4 flex justify-center items-center ${
                  darkModeEnabled ? "bg-[#334155]" : "bg-gray-200 text-black"
                }`}
              >
                <p
                  className={`text-xl font-semibold ${
                    darkModeEnabled ? "text-white" : ""
                  }`}
                >
                  Notification
                </p>
              </div>
              <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
                {(type === "Tutorial" ? saleData : artAndMusicSalesData)
                  ?.slice()
                  .reverse()
                  .map((item: any, index: number) => (
                    <div
                      className={`mb-1 h-auto rounded-lg p-2 ${
                        darkModeEnabled
                          ? "hover:bg-[#051139]"
                          : "hover:bg-[#f0f0f0]"
                      }  ${item.seen ? "" : ""}`}
                      key={index}
                    >
                      <div className="flex gap-1 w-full">
                        <p
                          className={`w-3/4 ${
                            darkModeEnabled ? "text-white" : "text-black"
                          }`}
                        >
                          {type === "Tutorial" ? (
                            <>
                              <strong>{item.title}</strong> is purchased by{" "}
                              {item.userName}
                            </>
                          ) : (
                            <>
                              <strong>{item.artName}</strong> is purchased by{" "}
                              {item.name}
                            </>
                          )}
                        </p>
                        <div className="w-1/4">
                          <img
                            src={
                              type === "Tutorial"
                                ? item.thumbnail
                                : item.artThumbnail || item.musicThumbnail
                            }
                            alt=""
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-1">
                        <p
                          className={`font-semibold ${
                            darkModeEnabled ? "text-gray-300" : "text-black"
                          }`}
                        >
                          ₹{item.price}
                        </p>
                        <p
                          className={
                            darkModeEnabled ? "text-gray-400" : "text-orange-500"
                          }
                        >
                         {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
