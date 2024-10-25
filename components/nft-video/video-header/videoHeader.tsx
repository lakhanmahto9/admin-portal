import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawerpage } from "../../drawer/drawer";
import { setModal } from "../../../redux/slice/openModal";
import { BellIcon, SettingIcon } from "../../utils/icons";
import { AdminNotification } from "@/components/notification/admin-notification";
import { userInformation } from "@/redux/slice/fetchAllUsersDetailSlice";

const VideoHeader: React.FC = () => {
  const [navfix, setNavFix] = useState(false);
  const fix = useSelector((state: any) => state.fix?.fix);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const dispatch = useDispatch();

  const setingModal = () => {
    dispatch(setModal({ open: true, type: "setting" }));
  };

  const callApiToFetchAllUserDetailsApi = async () => {
    await dispatch<any>(userInformation());
  };

  useEffect(() => {
    callApiToFetchAllUserDetailsApi();
    setNavFix(fix);
  }, [fix]);

  return (
    <div className={navfix ? "relative w-full mr-2" : ""}>
      <div
        className={`${
          navfix
            ? `fixed z-50 ${
                darkModeEnable ? 'bg-[#0e1a49]' : 'bg-[#070a68]'
              } border rounded-2xl px-2 w-[92%] lg:w-[78%]`
            : "w-full"
        } flex justify-between items-center h-20 mt-5`}
      >
        <div className="text-[#fff]">
          <p>Welcome To</p>
          <p>Tutorial Portal</p>
        </div>

        {/* Icons section */}
        <div className="flex gap-4 items-center">
          {/* Drawer button for smaller screens */}
          <div className="block sm:hidden cursor-pointer">
            <Drawerpage />
          </div>

          {/* Setting icon */}
          <div onClick={setingModal} className="cursor-pointer">
            <SettingIcon color="white" height="20" width="20" />
          </div>

          {/* Notification icon */}
          <div className="cursor-pointer">
            <AdminNotification />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHeader;
