import { useThemeColors } from "@/components/utils/useThemeColor";
import { BellIcon, SettingIcon } from "@/public/icons/icons";
import { setModal } from "@/redux/slice/openModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawerpage } from "../common/drawar/drawar";
import { Badge } from "@mui/material";

export const PhotographyHeader: React.FC = () => {
  const [navfix, setNavFix] = useState(false);
  const fix = useSelector((state: any) => state.fix?.fix);
  const totalsell = useSelector((state: any) => state.sale?.data?.sells || []);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const setingModal = (data: any) => {
    dispatch(setModal({ open: true, type: "setting" }));
  };
  const openNotificaion = () => {
    dispatch(setModal({ open: true, type: "notification" }));
  };
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const bg = useThemeColors(isDarkEnabled);
  const filterNotification = () => {
    const filtered = totalsell.filter((item: any) => item?.adminSeen === false);
    setCount(filtered.length);
  };
  useEffect(() => {
    setNavFix(fix);
  }, [fix]);
  useEffect(()=>{
    filterNotification();
  },[totalsell])

  return (
    <div className={navfix?"relative w-full mr-2":""}>
      <div className={`${navfix?`fixed z-50 bg-[${bg.headerbg}] border rounded-2xl px-2 w-[92%] lg:w-[78%]`:"w-full"}  flex justify-between items-center h-20 mt-5`}>
        <div className="text-[#fff]">
          <p>Welcome To</p>
          <p>Admin Dashboard</p>
        </div>
        <div className="flex gap-4">
          <div className="block lg:hidden"><Drawerpage /></div>
          <div onClick={setingModal}>
            {" "}
            <SettingIcon color="white" height="20" width="20" />
          </div>
          <div onClick={openNotificaion}>
            <Badge badgeContent={count} color="primary">
              <BellIcon color="#fff" height="20" width="20" />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
