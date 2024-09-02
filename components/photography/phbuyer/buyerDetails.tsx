import { DownloadIcon, LeftIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "@/redux/slice/photography/OpenModalSlice";
import { DialogModal } from "../common/modal";
import { buyerProile } from "@/redux/slice/photography/BuyerProfileSlice";

export const BuyerProfile: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const profile = useSelector((state: any) => state.buyerprofile?.data?.phbuyer);
  const profile1 = useSelector((state: any) => state.buyerprofile?.data?.phbuyer1);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const back = () => {
    router.push(
      "/admin-dashboard/seller-photography/photography-buyer-details"
    );
  };
  useEffect(() => {
    if (id) {
      callApiToProfile();
    }
  }, [id]);

  const callApiToProfile = async () => {
    try {
      await dispatch<any>(buyerProile({ buyerId: id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`w-full h-[83vh]  ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"} rounded-xl`}>
        <div
           className={`h-[12%] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between`}
        >
          <div onClick={back} className="flex items-center gap-4 px-2">
            <div className={`w-10 h-10 ${isDarkEnabled?"bg-[#040836]":"bg-[#025f92]"} flex items-center justify-center rounded-full  cursor-pointer`}>
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p className={`text-lg font-semibold   ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}>Buyer profile</p>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-4">
            <div className={`w-full h-auto md:h-1/2 border rounded-lg p-2 ${isDarkEnabled?"bg-[#040836]":"bg-[#ebf6fd]"}   flex flex-col gap-2 justify-center items-center`}>
              <div className="w-40 h-40 border rounded-full">
                <img
                  src={profile?.profile_pic || "/image/profile.png"}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className={`text-xl font-bold ${isDarkEnabled?"text-[#fff]":"text-[#2b4348]"}`}>
                {profile?.name}
              </p>
            </div>
            <div className={`hidden md:block ${isDarkEnabled?"bg-[#040836]":"bg-[#ebf6fd]"} relative w-full h-1/2 border rounded-lg bg-[#ebf6fd] px-16 py-2`}>
              {!profile?.idCard ? (
                <div className="w-full h-full border-2 border-dashed border-indigo-600 flex justify-center items-center">
                  <p className="text-xl font-bold text-[#2b4348]">ID Card</p>
                </div>
              ) : (
                <>
                  <div className="w-full h-full ">
                    <img
                      src={profile?.idCard}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="absolute bottom-4 right-2 w-12 h-12 cursor-pointer rounded-full bg-[#025f92] flex justify-center items-center">
                    <DownloadIcon color="#fff" width="20" height="20" />
                  </div>{" "}
                </>
              )}
            </div>
          </div>
          <div className={`w-full md:w-[60%] ${isDarkEnabled?"bg-[#040836] border":"bg-[#ebf6fd]"} rounded-lg px-8 py-4`}>
            <p className={`text-lg font-bold ${isDarkEnabled?"text-[#fff]":""}`}>Information</p>
            <div className="w-full h-auto md:h-16 border bg-[#025f92] rounded-md p-2 mb-4">
              <p className="text-white">
                {profile?.isApproved
                  ? "This profile has verified on our NFT marketplace."
                  : "This profile has not yet been verified on our NFT marketplace."}
              </p>
              <p className="text-white">
                Status:{" "}
                <span
                  className={
                    profile?.isApproved ? "text-[#6af109]" : "text-[#fd3f29]"
                  }
                >
                  {profile?.isApproved ? "Verified" : "Not verified"}
                </span>
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start ">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Name</p>
              <p className="text-lg text-[#6a6a6b]">{profile?.name}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Email</p>
              <p className="text-lg text-[#6a6a6b] break-all">{profile?.email}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Mobile Number</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.phone}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Address</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.address}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>City</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.city}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>State</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.state}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Country</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.country}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>PIN</p>
              <p className="text-lg text-[#6a6a6b]">{profile1?.postalCode}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled?"text-[#fff]":""}`}>Aboyt Me</p>
              <p className="text-lg text-[#6a6a6b] break-all">{profile1?.aboutMe}</p>
            </div>
            <div
              
              onClick={() =>{
                if(!profile?.isApproved){
                  dispatch(setDialog({ open: true, type: "buyerverify", id: id }))
                }}
              }
              className="mt-4 w-40 h-12 bg-[#025f92] cursor-pointer rounded-md py-1 flex justify-center items-center gap-2"
            >
              <p className="text-white">Verify</p>
            </div>
          </div>
        </div>
      </div>
      <DialogModal />
    </>
  );
};
