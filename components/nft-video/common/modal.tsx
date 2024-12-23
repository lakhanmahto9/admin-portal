import { CloseIcon } from "../../utils/icons";
import { removeModal } from "@/redux/slice/openModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Addphotographyform } from "../addphotography/AddPhotoGraphyForm";
// import { Editphotographyform } from "../addphotography/EditPhotoGraphyForm";
// import { ProfileForm } from "../profile/profile-form";
// import { EditProfileForm } from "../profile/edit-profile-form";
import { SettingModal } from "../common/setting";
// import { NotificatonPage } from "@/components/notification/Notification";

export const OpenModal: React.FC = () => {
  const dispatch = useDispatch();
  const modaltype = useSelector((state: any) => state.modal.type);
  const closeModal = () => {
    dispatch(removeModal({ open: false, type: "" }));
  };
  return (
    <div className=" z-50  w-96 h-screen top-0 right-0 bg-[#dae2ff] shadow-inner fixed">
      <div className="h-[14%] p-4 border-b border-[#bbb9b9]">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <div className="w-16 h-16 rounded-full">
              <img
                src="/clogo.png"
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="">
              <p className="font-semibold text-[#311f93] text-sm">
                Admin
              </p>
              <p className="font-semibold text-[#311f93] text-sm">
                worldcentum@gmail.com
              </p>
            </div>
          </div>
          <div onClick={closeModal}>
            <CloseIcon color="#311f93" width="28" height="28" />
          </div>
        </div>
      </div>
      <div className="h-[86%]">
        {/* {modaltype === "Add-Photo" && <Addphotographyform />}
        {modaltype === "Edit" && <Editphotographyform />}
        {modaltype === "Add-Profile" && <ProfileForm/>}
        {modaltype === "Edit-Profile" && <EditProfileForm/>} */}
        {modaltype === "setting" && <SettingModal/>}
        {/* {modaltype === "notification" && <NotificatonPage/>} */}
      </div>
      
    </div>
  );
};
