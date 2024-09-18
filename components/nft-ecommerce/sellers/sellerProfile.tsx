import { DownloadIcon, LeftIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "@/redux/slice/photography/OpenModalSlice";
import { DialogModal } from "../common/modal";
import { viewSellerThunk } from "@/redux/slice/ecommerce/sellerActionSlice";
import { useThemeColors } from "@/components/utils/useThemeColor";

const SellerProfile: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const profile = useSelector(
    (state: any) => state.sellerActions?.sellerDetails?.data
  );

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
        await dispatch<any>(viewSellerThunk(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-sellers");
  };

  const downloadIdCard = () => {
    const idCardUrl = profile?.seller?.idCard;
    if (idCardUrl) {
      const link = document.createElement("a");
      link.href = idCardUrl;
      link.download = "id_card.jpg"; // Name of the file to be downloaded
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
              Seller Profile
            </p>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-4">
            {/* Profile Section */}
            <div
              className={`w-full h-auto md:h-1/2 border rounded-lg p-4 ${
                isDarkEnabled ? "bg-[#051139]" : "bg-[#ebf6fd]"
              } flex flex-col gap-4 justify-center items-center`}
            >
              <div className="w-40 h-40 border-4 border-[#025f92] rounded-full overflow-hidden">
                <img
                  src={profile?.seller?.profile_pic || "/image/profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className={`text-xl font-bold ${
                  isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"
                }`}
              >
                {profile?.seller?.name}
              </p>
            </div>

            {/* ID Card Section */}
            <div
              className={`w-full h-auto border rounded-lg p-2 relative ${
                isDarkEnabled ? "bg-[#051139]" : "bg-[#ebf6fd]"
              }`}
            >
              {!profile?.seller?.idCard ? (
                <div className="w-full h-40 border-2 border-dashed border-indigo-600 flex justify-center items-center">
                  <p className="text-xl font-bold text-[#2b4348]">ID Card</p>
                </div>
              ) : (
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={profile?.seller?.idCard}
                    alt="ID Card"
                    className="w-60 h-full object-cover rounded-md"
                  />
                  <div
                    onClick={downloadIdCard}
                    className="absolute bottom-4 right-2 w-10 h-10 cursor-pointer rounded-full bg-[#025f92] flex justify-center items-center"
                  >
                    <DownloadIcon color="#fff" width="20" height="20" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
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
                {profile?.seller?.isApproved
                  ? "This profile has been verified on our NFT marketplace."
                  : "This profile has not yet been verified on our NFT marketplace."}
              </p>
              <p className="text-white">
                Status:{" "}
                <span
                  className={
                    profile?.seller?.isApproved
                      ? "text-[#6af109]"
                      : "text-[#fd3f29]"
                  }
                >
                  {profile?.seller?.isApproved ? "Verified" : "Not Verified"}
                </span>
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                Name
              </p>
              <p className="text-lg " style={{color:colors.text}}>{profile?.seller?.name}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                Email
              </p>
              <p className="text-lg  break-all" style={{color:colors.text}}>
                {profile?.seller?.email}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                Mobile Number
              </p>
              <p className="text-lg " style={{color:colors.text}}>{profile?.seller?.phone}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                Address
              </p>
              <p className="text-lg" style={{color:colors.text}}>
                {profile?.address?.address}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                City
              </p>
              <p className="text-lg" style={{color:colors.text}}>{profile?.address?.city}</p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                State
              </p>
              <p className="text-lg" style={{color:colors.text}}>
                {profile?.address?.state}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                Country
              </p>
              <p className="text-lg" style={{color:colors.text}}>
                {profile?.address?.country}
              </p>
            </div>
            <div className="flex gap-4 justify-between md:justify-start">
              <p
                className={`text-lg font-semibold `}
                style={{color:colors.text}}
              >
                PIN
              </p>
              <p className="text-lg" style={{color:colors.text}}>
                {profile?.address?.postalCode}
              </p>
            </div>

            <div
              onClick={() => {
                if (!profile?.seller?.isApproved) {
                  dispatch(
                    setDialog({ open: true, type: "sellerVerify", id: id })
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

export default SellerProfile;
