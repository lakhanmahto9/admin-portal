import { Notification } from "@/components/utils/icons";
import { Badge, Tooltip, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disabledAdminNotification } from "@/redux/slice/disabledNotificationSlice";
import moment from 'moment';
import { CheckDoubleIcon, CheckIcon } from "../utils/icons";
import { disabledAdminNotificationForVideo } from "@/redux/slice/disabledNotificationForVideoSlice";

interface SaleCourse {
  adminSeen: boolean;
  userName: string;
  thumbnail: string;
  price: number;
  title: string;
  createdAt: string;
}

export const AdminNotification: React.FC = () => {
  const saleData = useSelector((state: any) => state?.user?.sale) || [];
  const artAndMusicSalesData = useSelector((state: any) => state?.user?.artAndMusicSales) || [];
  const type = useSelector((state: any) => state.open.type);
  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  const [saleNumber, setSaleNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === "Tutorial" && saleData?.length > 0) {
          const unseenNotifications = saleData.filter((item: any) => !item.adminSeen);
          setSaleNumber(unseenNotifications.length);
        } else if (type === "Digital Art and Music" && artAndMusicSalesData?.length > 0) {
          const unseenNotifications = artAndMusicSalesData.filter((item: any) => !item.adminSeen);
          setSaleNumber(unseenNotifications.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, saleData, artAndMusicSalesData]);

  const openNotificationModal = () => {
    setOpen(!open);
  };

  const handleClickOutside = async (event: MouseEvent) => {
    try {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSaleNumber(0); // Reset the badge count when closing the modal
        if(type === 'Tutorial'){
          await dispatch<any>(disabledAdminNotificationForVideo());
        }else{
          await dispatch<any>(disabledAdminNotification());
        }
        
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

  // Function to sort notifications with unseen ones on top
  const sortNotifications = (notifications: any[]) => {
    return notifications
      .slice() // Make a copy of the notifications array
      .sort((a, b) => {
        if (!a.adminSeen && b.adminSeen) {
          return -1; // Unseen notifications come first
        } else if (a.adminSeen && !b.adminSeen) {
          return 1; // Seen notifications come after unseen
        }
        // If both are unseen or seen, sort by createdAt date
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  };

  return (
    <div>
      <Tooltip title="Notification">
        <Badge
          badgeContent={saleNumber}
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
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <CircularProgress />
                  </div>
                ) : (
                  sortNotifications(type === "Tutorial" ? saleData : artAndMusicSalesData)
                    .map((item: any, index: number) => (
                      <div
                        className={`mb-1 h-auto rounded-lg p-2 ${
                          darkModeEnabled
                            ? "hover:bg-[#051139]"
                            : "hover:bg-[#f0f0f0]"
                        }`}
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
                                <p className="text-blue-500">{item.userName}</p>
                              </>
                            ) : (
                              <>
                                <strong>{item.artName}</strong> is purchased by{" "}
                                <p className="text-blue-600">{item.name}</p>
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
                        {/* Display tick icon based on adminSeen status */}
                        <div className="flex justify-end mt-2">
                          {item.adminSeen ? (
                            <CheckDoubleIcon color="#0e87f1" width="20" height="20" />
                          ) : (
                            <CheckIcon color="#858e98" width="20" height="20" />
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
