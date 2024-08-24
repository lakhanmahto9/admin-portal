import { LeftIcon, SearchIcon, ThreedotIcon } from "@/public/icons/icons";
import React from "react";

export const PhotographySellerDetails: React.FC = () => {
  return (
    <div className={`w-full h-[83vh]  bg-[#fff] rounded-xl`}>
      <div className={`h-[12%] bg-[#dae2ff] rounded-t-xl flex justify-between`}>
        <div className="flex items-center gap-4 px-2">
          <div className="w-10 h-10 bg-[#025f92] flex items-center justify-center rounded-full  cursor-pointer">
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p className={`text-lg font-semibold text-[#192555]`}>All Seller</p>
        </div>
        <div className="flex px-2 gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              //   onChange={handleSearch}
              placeholder="Search..."
              className="w-40 h-10 rounded-full pl-10 focus:outline-none"
            />
            <div className="absolute top-3 left-2">
              <SearchIcon color="#2e10dc" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
        <div className="relative w-[32%] h-72">
          <div className="h-2/3 rounded-t-2xl bg-[#025f92] flex justify-center items-center">
            <div className="w-28 h-28 rounded-full border">
              <img
                src="/nft4.png"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="h-1/3 bg-[#084363] rounded-b-2xl py-5">
            <div className="flex gap-2 h-14 px-2">
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Photography</p>
                </div>
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Buyer</p>
                </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 px-5 rounded-full w-auto h-7 bg-[#084363] cursor-pointer">
            <p className="text-[#fff]">Profile</p>
          </div>
          <div className="flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 bg-[#2c8993] rounded-full">
            <p className="text-[#fff]">Unblocked</p>{" "}
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2 bg-[#2c8993] rounded-full">
            <ThreedotIcon width="20" height="20" color="#fff"/>
          </div>
        </div>
        <div className="relative w-[32%] h-72">
          <div className="h-2/3 rounded-t-2xl bg-[#025f92] flex justify-center items-center">
            <div className="w-28 h-28 rounded-full border">
              <img
                src="/nft4.png"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="h-1/3 bg-[#084363] rounded-b-2xl py-5">
            <div className="flex gap-2 h-14 px-2">
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Photography</p>
                </div>
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Buyer</p>
                </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 px-5 rounded-full w-auto h-7 bg-[#084363] cursor-pointer">
            <p className="text-[#fff]">Profile</p>
          </div>
          <div className="flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 bg-[#2c8993] rounded-full">
            <p className="text-[#fff]">Unblocked</p>{" "}
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2 bg-[#2c8993] rounded-full">
            <ThreedotIcon width="20" height="20" color="#fff"/>
          </div>
        </div>
        <div className="relative w-[32%] h-72">
          <div className="h-2/3 rounded-t-2xl bg-[#025f92] flex justify-center items-center">
            <div className="w-28 h-28 rounded-full border">
              <img
                src="/nft4.png"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="h-1/3 bg-[#084363] rounded-b-2xl py-5">
            <div className="flex gap-2 h-14 px-2">
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Photography</p>
                </div>
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Buyer</p>
                </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 px-5 rounded-full w-auto h-7 bg-[#084363] cursor-pointer">
            <p className="text-[#fff]">Profile</p>
          </div>
          <div className="flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 bg-[#2c8993] rounded-full">
            <p className="text-[#fff]">Unblocked</p>{" "}
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2 bg-[#2c8993] rounded-full">
            <ThreedotIcon width="20" height="20" color="#fff"/>
          </div>
        </div>
        <div className="relative w-[32%] h-72">
          <div className="h-2/3 rounded-t-2xl bg-[#025f92] flex justify-center items-center">
            <div className="w-28 h-28 rounded-full border">
              <img
                src="/nft4.png"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="h-1/3 bg-[#084363] rounded-b-2xl py-5">
            <div className="flex gap-2 h-14 px-2">
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Photography</p>
                </div>
                <div className="w-1/2 bg-[#025f92] cursor-pointer rounded-lg flex justify-center items-center">
                    <p className="text-[#fff]">Buyer</p>
                </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 px-5 rounded-full w-auto h-7 bg-[#084363] cursor-pointer">
            <p className="text-[#fff]">Profile</p>
          </div>
          <div className="flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 bg-[#2c8993] rounded-full">
            <p className="text-[#fff]">Unblocked</p>{" "}
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2 bg-[#2c8993] rounded-full">
            <ThreedotIcon width="20" height="20" color="#fff"/>
          </div>
        </div>
      </div>
    </div>
  );
};
