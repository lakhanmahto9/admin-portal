import React, { ReactNode } from "react";
import { SettingIcon } from "../../utils/icons";
import SallerSidebar from "../video-sidebar/videoSidebar";
import SellerHeader from "../video-header/videoHeader";
import { OpenModal } from "../common/modal";
import { useSelector } from "react-redux";
import { setModal } from "../../../redux/slice/openModal";
import { useDispatch } from "react-redux";
import { SettingModal } from "../common/setting";

interface VideoLayoutProps {
  children: ReactNode;
}

const VideoLayout: React.FC<VideoLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => state.modal.open);
  const setingModal = (data: any) => {
    dispatch(setModal({ open: true, type: "setting" }));
  };
  return (
    <div className="relative flex w-full min-h-screen ">
      <div
        className="fixed top-0 left-0 w-full"
        style={{
          height: "43vh",
          background: "#070a68",
          zIndex: 0,
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-full"
        style={{
          height: "59vh",
          background: "#f4f6f8",
          zIndex: 0,
        }}
      ></div>
      <div className="w-1/5 z-10 fixed hidden lg:block">
        <SallerSidebar />
      </div>
      <div className="w-full px-4 lg:w-4/5 z-10 ml-auto">
        <div>
          <SellerHeader />
        </div>
        {children}
      </div>
      <div onClick={setingModal} className="fixed bottom-4 right-8 z-20 w-14 h-14 rounded-full bg-slate-200 shadow-2xl flex justify-center items-center">
        <SettingIcon color="" width="24" height="24" />
      </div>
      <div>{modal && <OpenModal />}</div>
    </div>
  );
};
export default VideoLayout;
