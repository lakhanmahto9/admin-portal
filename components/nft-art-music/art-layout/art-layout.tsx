import React, { ReactNode } from "react";
import { SettingIcon } from "../../utils/icons";
import ArtSidebar from "../art-sidebar/artSidebar";
import ArtHeader from "../art-header/artHeader";
import { OpenModal } from "../../nft-video/common/modal";
import { useSelector } from "react-redux";
import { setModal } from "../../../redux/slice/openModal";
import { useDispatch } from "react-redux";
import { SettingModal } from "../../nft-video/common/setting";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface ArtLayoutProps {
  children: ReactNode;
}

const ArtLayout: React.FC<ArtLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => state.modal.open);
  const fix = useSelector((state: any) => state.fix?.fix);
  const setingModal = (data: any) => {
    dispatch(setModal({ open: true, type: "setting" }));
  };
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  return (
    <div className="relative flex w-full min-h-screen ">
      <div
        className="fixed top-0 left-0 w-full"
        style={{
          backgroundColor: colors.topBackground,
          height: "43vh",
          zIndex: 0,
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-full"
        style={{
          height: "59vh",
          background: colors.bottomBackground,
          zIndex: 0,
        }}
      ></div>
      <div className="w-1/5 z-10 fixed hidden lg:block">
        <ArtSidebar />
      </div>
      <div className="w-full px-4 lg:w-4/5 z-10 ml-auto">
        <div className={fix ? "mb-28" : ""}>
          <ArtHeader />
        </div>
        {children}
      </div>
      <div
        onClick={setingModal}
        className="fixed bottom-4 right-8 z-20 w-14 h-14 rounded-full bg-slate-200 shadow-2xl flex justify-center items-center"
      >
        <SettingIcon color="" width="24" height="24" />
      </div>
      <div>{modal && <OpenModal />}</div>
    </div>
  );
};
export default ArtLayout;
