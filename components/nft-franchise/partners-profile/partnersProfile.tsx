import { DownloadIcon, LeftIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "@/redux/slice/blockOpenModalSlice";
import { DialogModal } from "../common/modal";
import { partnersProfileDetails } from "@/redux/slice/partnersProfileDetailsSlice";
import { useThemeColors } from "@/components/utils/useThemeColor";

export const PartnersProfile: React.FC = () => {
  const profile = useSelector(
    (state: any) => state.partnersProfileDetails?.data?.partners
  );

  const profile1 = useSelector(
    (state: any) => state.artMusicBuyerProfile?.data?.buyerAdress
  );
  const isDarkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkModeEnable);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const back = () => {
    router.push("/admin-dashboard/nft-franchise/franchise");
  };
  useEffect(() => {
    if (id) {
      callApiToProfile();
    }
  }, [id]);

  const callApiToProfile = async () => {
    try {
      await dispatch<any>(partnersProfileDetails({ buyerId: id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`w-full h-[83vh] rounded-xl`}
        style={{ background: colors.cardBg }}
      >
        <div
          className={`h-[12%] rounded-t-xl flex justify-between`}
          style={{ background: colors.sidebarBg }}
        >
          <div onClick={back} className="flex items-center gap-4 px-2">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full  cursor-pointer ${
                isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
              }`}
            >
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p
              className={`text-lg font-semibold `}
              style={{ color: colors.text }}
            >
              Partner profile
            </p>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-4">
            <div
              className={`w-full h-full md:h-1/2 rounded-lg flex flex-col gap-2 justify-center items-center ${
                isDarkModeEnable
                  ? "bg-[#051139] border border-gray-600"
                  : "bg-[#ebf6fd] border"
              }`}
            >
              <div className="w-40 h-40 border rounded-full">
                <img
                  src={profile?.profile_pic || "/image/profile.png"}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-xl font-bold " style={{color:colors.text}}>
                {profile?.name || "NA"}
              </p>
            </div>
            <div className={`relative w-full h-80 md:h-1/2 rounded-lg px-16 py-2 ${isDarkModeEnable ? "bg-[#051139] border border-gray-600" : "bg-[#ebf6fd] border "}`}>
              {!profile1?.idCard ? (
                <div className="w-full h-full border-2 border-dashed border-indigo-600 flex justify-center items-center">
                  <p className="text-xl font-bold text-[#2b4348]">ID Card</p>
                </div>
              ) : (
                <>
                  <div className="w-full h-full ">
                    <img
                      src={profile1?.idCard}
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
          <div className={`w-full md:w-[60%] rounded-lg px-8 py-4 ${isDarkModeEnable ? "bg-[#051139]" : "bg-[#ebf6fd] "}`}>
            <p className="text-lg font-bold" style={{color:colors.text}}>Information</p>
            <div className="w-full  md:h-16  rounded-md p-2 mb-4" style={{background:colors.dialogBackground}}>
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
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Name</p>
              <p className="text-lg "style={{color:colors.text}}>{profile?.name}</p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Email</p>
              <p className="text-lg "style={{color:colors.text}}>{profile?.email}</p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Mobile Number</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.phone || "NA"}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Address</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.address || "NA"}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>City</p>
              <p className="text-lg "style={{color:colors.text}}>{profile1?.city || "NA"}</p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>State</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.state || "NA"}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Country</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.country || "NA"}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>PIN</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.postalCode || "NA"}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-lg font-semibold" style={{color:colors.text}}>Aboyt Me</p>
              <p className="text-lg "style={{color:colors.text}}>
                {profile1?.aboutMe || "NA"}
              </p>
            </div>
            <button
              onClick={() =>
                dispatch(setDialog({ open: true, type: "partnerVerify", id: id }))
              }
              disabled={profile?.isApproved}
              className={`mt-4 w-40 h-12 rounded-md py-1 flex justify-center items-center gap-2 ${
                profile?.isApproved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#025f92] cursor-pointer"
              }`}
            >
              <p className="text-white">
                {profile?.isApproved ? "Verified" : "Verify"}
              </p>
            </button>
          </div>
        </div>
      </div>
      <DialogModal />
    </>
  );
};
