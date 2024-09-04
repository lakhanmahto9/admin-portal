
import { removeModal } from "@/redux/slice/openModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SettingModal } from "../setting/Setting";
import { CloseIcon } from "@/public/icons/icons";
import { NotificatonPage } from "../notification/NotificationPage";
import { upadateNotification } from "@/redux/slice/photography/NotificationUpdateSlice";
import { salesPhotography } from "@/redux/slice/photography/PhotographySaleSlice";

export const OpenModal: React.FC = () => {
  const dispatch = useDispatch();
  const modaltype = useSelector((state: any) => state.modal.type);
  const auth = useSelector((state: any) => state.auth.data?.data?.phSeller);
  const closeModal = async () => {
    dispatch(removeModal({ open: false, type: "" }));
    if(modaltype === "notification"){
     const result =  await dispatch<any>(upadateNotification())
     if(result.payload?.success){
      await dispatch<any>(salesPhotography());
     }
    }
  };
  return (
    <div className="fixed z-50  w-96 h-screen top-0 right-0 bg-[#dae2ff] shadow-inner">
      <div className="h-[14%] p-4 border-b border-[#bbb9b9]">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <div className="w-16 h-16 rounded-full">
              <img
                src="/image/profile.png"
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="">
              <p className="font-semibold text-[#311f93] text-sm">
                Admin
              </p>
              <p className="font-semibold text-[#311f93] text-sm">
                admin portal
              </p>
            </div>
          </div>
          <div onClick={closeModal}>
            <CloseIcon color="#311f93" width="28" height="28" />
          </div>
        </div>
      </div>
      <div className="h-[86%]">
        {modaltype === "setting" && <SettingModal/>}
        {modaltype === "notification" && <NotificatonPage/>}
      </div>
    </div>
  );
};
