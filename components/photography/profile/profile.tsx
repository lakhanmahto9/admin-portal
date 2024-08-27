import { DownloadIcon, LeftIcon, SearchIcon } from "@/public/icons/icons";
import React from "react";
import { useRouter } from "next/router";

export const Profile: React.FC = () => {
  const router = useRouter();
  const pic = localStorage.getItem("image");
  const name = localStorage.getItem("sellername");

  const back = () => {
    router.push(
      "/admin-dashboard/seller-photography/photography-seller-details"
    );
  };
  return (
    <div className={`w-full h-[83vh]  bg-[#fff] rounded-xl`}>
      <div className={`h-[12%] bg-[#dae2ff] rounded-t-xl flex justify-between`}>
        <div onClick={back} className="flex items-center gap-4 px-2">
          <div className="w-10 h-10 bg-[#025f92] flex items-center justify-center rounded-full  cursor-pointer">
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p className={`text-lg font-semibold text-[#192555]`}>Profile</p>
        </div>
      </div>
      <div className="w-full h-[88%] overflow-y-scroll flex p-7 gap-4">
        <div className="w-[40%] flex flex-col gap-4">
          <div className="w-full h-1/2 border rounded-lg bg-[#ebf6fd] flex flex-col gap-2 justify-center items-center">
            <div className="w-40 h-40 border rounded-full">
              <img
                src={pic || "/image/profile.png"}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-xl font-bold text-[#2b4348]">{name}</p>
          </div>
          <div className="relative w-full h-1/2 border rounded-lg bg-[#ebf6fd] px-16 py-2">
            {/* <div className="w-full h-full border-2 border-dashed border-indigo-600 flex justify-center items-center">
                <p className="text-xl font-bold text-[#2b4348]">ID Card</p>
            </div> */}
            <div className="w-full h-full ">
            <img
                src="/image/aadhar.jpg"
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="absolute bottom-4 right-2 w-12 h-12 cursor-pointer rounded-full bg-[#025f92] flex justify-center items-center">
                <DownloadIcon color="#fff" width="20" height="20"/>
            </div>
          </div>
        </div>
        <div className="w-[60%] bg-[#ebf6fd] rounded-lg px-8 py-4">
                <p className="text-lg font-bold">Information</p>
                <div className="w-full h-16 border bg-[#025f92] rounded-md p-2 mb-4">
                    <p className="text-white">This profile has not yet been verified on our NFT marketplace.</p>
                    <p className="text-white">Status: <span className="text-[#fd3f29]">Not verified</span></p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Name</p>
                    <p className="text-lg text-[#6a6a6b]">Ronak Kumar</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Email</p>
                    <p className="text-lg text-[#6a6a6b]">ronak@gmail.com</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Mobile Number</p>
                    <p className="text-lg text-[#6a6a6b]">7890976567</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Address</p>
                    <p className="text-lg text-[#6a6a6b]">Kalipark</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">State</p>
                    <p className="text-lg text-[#6a6a6b]">WB</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Gender</p>
                    <p className="text-lg text-[#6a6a6b]">Male</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">Country</p>
                    <p className="text-lg text-[#6a6a6b]">India</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-lg font-semibold">PIN</p>
                    <p className="text-lg text-[#6a6a6b]">700107</p>
                </div>
                <div className="mt-8 w-40 h-12 bg-[#025f92] cursor-pointer rounded-md py-1 flex justify-center items-center gap-2">
                    <p className="text-white">Verify</p>
                </div>
        </div>
      </div>
    </div>
  );
};
