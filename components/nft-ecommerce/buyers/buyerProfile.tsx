import { DownloadIcon, LeftIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "@/redux/slice/photography/OpenModalSlice";
import { DialogModal } from "../common/modal";
import { viewUserThunk } from "@/redux/slice/ecommerce/actionSlice";

const BuyerProfile: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const profile = useSelector((state: any) => state.userActions?.userDetails?.data);

  console.log(profile, "profile")

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
      if (typeof id === 'string') {
        await dispatch<any>(viewUserThunk(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const back = () => {
    router.push("/admin-dashboard/seller-photography/photography-buyer-details");
  };

  return (
    <>
      <div className={`w-full h-[83vh] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"} rounded-xl`}>
        <div className={`h-[12%] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between`}>
          <div onClick={back} className="flex items-center gap-4 px-2">
            <div className={`w-10 h-10 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex items-center justify-center rounded-full cursor-pointer`}>
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}>
              Buyer Profile
            </p>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-4">
            <div className={`w-full h-auto md:h-1/2 border rounded-lg p-2 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#ebf6fd]"} flex flex-col gap-2 justify-center items-center`}>
              <div className="w-40 h-40 border rounded-full">
                <img
                  src={profile?.buyer?.profile_pic || "/image/profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className={`text-xl font-bold ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                {profile?.buyer?.name}
              </p>
            </div>
            <div className={`hidden md:block ${isDarkEnabled ? "bg-[#040836]" : "bg-[#ebf6fd]"} relative w-full h-1/2 border rounded-lg px-16 py-2`}>
              {!profile?.idCard ? (
                <div className="w-full h-full border-2 border-dashed border-indigo-600 flex justify-center items-center">
                  <p className="text-xl font-bold text-[#2b4348]">ID Card</p>
                </div>
              ) : (
                <>
                  <div className="w-full h-full">
                    <img
                      src={profile?.idCard}
                      alt="ID Card"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="absolute bottom-4 right-2 w-12 h-12 cursor-pointer rounded-full bg-[#025f92] flex justify-center items-center">
                    <DownloadIcon color="#fff" width="20" height="20" />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={`w-full md:w-[60%] ${isDarkEnabled ? "bg-[#040836] border" : "bg-[#ebf6fd]"} rounded-lg px-8 py-4`}>
            <p className={`text-lg font-bold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
              Information
            </p>
            <div className="w-full h-auto md:h-16 border bg-[#025f92] rounded-md p-2 mb-4">
              <p className="text-white">
                {profile?.isApproved
                  ? "This profile has been verified on our NFT marketplace."
                  : "This profile has not yet been verified on our NFT marketplace."}
              </p>
              <p className="text-white">
                Status:{" "}
                <span className={profile?.isApproved ? "text-[#6af109]" : "text-[#fd3f29]"}>
                  {profile?.isApproved ? "Verified" : "Not Verified"}
                </span>
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                Name
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.buyer?.name}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                Email
              </p>
              <p className="text-lg text-[#6a6a6b] break-all">{profile?.buyer?.email}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                Mobile Number
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.buyer?.phone}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                Address
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.address?.address}</p> {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                City
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.address?.city}</p> {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                State
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.address?.state}</p> {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                Country
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.address?.country}</p> {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                PIN
              </p>
              <p className="text-lg text-[#6a6a6b]">{profile?.address?.postalCode}</p> {/* Adjusted for address field */}
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                About Me
              </p>
              <p className="text-lg text-[#6a6a6b] break-all">{profile?.about}</p>
            </div>

            <div
              onClick={() => {
                if (!profile?.isApproved) {
                  dispatch(
                    setDialog({ open: true, type: "buyerverify", id: id })
                  );
                }
              }}
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

export default BuyerProfile;
