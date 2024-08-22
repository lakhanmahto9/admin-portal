import { BellIcon, SettingIcon } from "../../utils/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { Drawerpage } from "../drawer/drawer";
import { setModal } from "../../../redux/slice/openModal";
import { useDispatch } from "react-redux";

const VideoHeader: React.FC = () => {
    const [navfix, setNavFix] = useState(false);
    const dispatch = useDispatch();
    // const auth = useSelector((state: any) => state.auth.data?.data?.phSeller);
    const setingModal = (data: any) => {
      dispatch(setModal({ open: true, type: "setting" }));
    };
    const openNotificaion =()=>{
        // dispatch(setModal({ open: true, type: "notification" }));
    }
  return (
    <div className={navfix?"relative w-full mr-2":""}>
      <div className={`${navfix?"fixed z-50 bg-[#070a68] border rounded-2xl px-2 w-[92%] lg:w-[78%]":"w-full"}  flex justify-between items-center h-20 mt-5`}>
        <div className="text-[#fff]">
          <p>Welcome To</p>
          {/* <p>{auth?.name}</p> */}
        </div>
        <div className="flex gap-4">
        <div className="block lg:hidden">
            {/* <Drawerpage /> */}
          </div>
          <div onClick={setingModal}>
            {" "}
            <SettingIcon color="white" height="20" width="20" />
          </div>
          <div onClick={openNotificaion}><BellIcon color="#fff" height="20" width="20" /></div>
        </div>
      </div>
    </div>
  );
};
export default VideoHeader;
