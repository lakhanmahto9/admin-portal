import { DownloadIcon, LeftIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "@/redux/slice/photography/OpenModalSlice";
import { DialogModal } from "../common/modal";
import { viewUserThunk } from "@/redux/slice/ecommerce/actionSlice";
import { useThemeColors } from "@/components/utils/useThemeColor";

const BuyerProfile: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const profile = useSelector(
    (state: any) => state.userActions?.userDetails?.data
  );

  // console.log(profile, "profile")
  // console.log(  profile?.buyer?.profile_pic , "profile pic"  )

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      callApiToProfile();
    }
  }, [id]);

  const callApiToProfile = async () => {
    try {
      if (typeof id === "string") {
        await dispatch<any>(viewUserThunk(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-buyers");
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
              className={`w-10 h-10 ${
                isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92]"
              } flex items-center justify-center rounded-full cursor-pointer`}
            >
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkEnabled ? "text-[#fff]" : "text-[#192555]"
              }`}
            >
              Buyer Profile
            </p>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-4">
            <div
              className={`w-full h-auto md:h-1/2 border rounded-lg p-2 ${
                isDarkEnabled ? "bg-[#051139]" : "bg-[#ebf6fd]"
              } flex flex-col gap-2 justify-center items-center`}
            >
              <div className="w-40 h-40 border rounded-full">
                <img
                  src={profile?.buyer?.profile_pic || "/image/profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p
                className={`text-xl font-bold ${
                  isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"
                }`}
              >
                {profile?.buyer?.name}
              </p>
            </div>
          </div>
          <div
            className={`w-full md:w-[60%] ${
              isDarkEnabled ? "bg-[#051139] border" : "bg-[#ebf6fd]"
            } rounded-lg px-8 py-4`}
          >
            <p
              className={`text-lg font-bold ${
                isDarkEnabled ? "text-[#fff]" : ""
              }`}
            >
              Information
            </p>
            <div className="w-full h-auto md:h-16 border bg-[#025f92] rounded-md p-2 mb-4">
              <p className="text-white">
                {profile?.buyer?.isApproved
                  ? "This profile has been verified on our NFT marketplace."
                  : "This profile has not yet been verified on our NFT marketplace."}
              </p>
              <p className="text-white">
                Status:{" "}
                <span
                  className={
                    profile?.buyer?.isApproved
                      ? "text-[#6af109]"
                      : "text-[#fd3f29]"
                  }
                >
                  {!profile?.buyer?.isApproved ? "Not Verified" : "Verified"}
                </span>
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                Name
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.buyer?.name}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                Email
              </p>
              <p className="text-lg break-all" style={{ color: colors.text }}>
                {profile?.buyer?.email}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                Mobile Number
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.buyer?.phone}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                Address
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.address?.address}
              </p>{" "}
              {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                City
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.address?.city}
              </p>{" "}
              {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                State
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.address?.state}
              </p>{" "}
              {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                Country
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.address?.country}
              </p>{" "}
              {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : ""
                }`}
              >
                PIN
              </p>
              <p className="text-lg" style={{ color: colors.text }}>
                {profile?.address?.postalCode}
              </p>{" "}
              {/* Adjusted for address field */}
            </div>
            {/* <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                About Me
              </p>
              <p className="text-lg text-[#6a6a6b] break-all">{profile?.about}</p>
            </div> */}

            {
              !profile?.buyer?.isApproved &&(

          

            <div
              onClick={() => {
                  dispatch(
                    setDialog({ open: true, type: "buyerVerify", id: id })
                  );
                
              }}
              className="mt-4 w-40 h-12 bg-[#025f92] cursor-pointer rounded-md py-1 flex justify-center items-center gap-2"
            >
              <button className="text-white">Verify</button>
            </div>
                  
                )
              }
          </div>
        </div>
      </div>
      <DialogModal />
    </>
  );
};

export default BuyerProfile;
