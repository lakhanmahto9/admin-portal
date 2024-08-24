import React, { useState } from "react";
import { useRouter } from "next/router";
import { Login } from "../credentials/login";
import { openCredential } from "@/redux/slice/creadentialSlice";
import { useDispatch } from "react-redux";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tutorial");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleDahsboard = (type: string) => {
    if (type === "video") {
      router.push("/seller-video/seller-dashboard");
    } else if (type === "art") {
      router.push("/seller-art/seller-dashboard");
    }
  };
  
  return (
    <div className="w-full h-screen bg-[#20364b] pl-10 pr-5 py-7">
      <div className="flex justify-between">
        <div className="">
          <p className="text-slate-100 text-2xl">Creative</p>
          <p className="text-[#ddba4c] font-semibold text-2xl">Marketing</p>
        </div>
        <div className="flex gap-2 h-10">
          <p
            onClick={() => setActiveTab("Tutorial")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "Tutorial"
                ? "text-slate-100 border-b-2 border-[#ddba4c]"
                : "text-slate-300 border-b-2 border-transparent hover:border-[#ddba4c]"
            }`}
          >
            Tutorial
          </p>
          <p
            onClick={() => setActiveTab("Digital Art and Music")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "Digital Art and Music"
                ? "text-slate-100 border-b-2 border-[#ddba4c]"
                : "text-slate-300 border-b-2 border-transparent hover:border-[#ddba4c]"
            }`}
          >
            Digital Art and Music
          </p>
          <p
            onClick={() => setActiveTab("Digital photography")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "Digital photography"
                ? "text-slate-100 border-b-2 border-[#ddba4c]"
                : "text-slate-300 border-b-2 border-transparent hover:border-[#ddba4c]"
            }`}
          >
            Digital photography
          </p>
          <p
            onClick={() => setActiveTab("E-Commerce")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "E-Commerce"
                ? "text-slate-100 border-b-2 border-[#ddba4c]"
                : "text-slate-300 border-b-2 border-transparent hover:border-[#ddba4c]"
            }`}
          >
            E-Commerce
          </p>
          <div
            // id="bg-div"
            className="w-20 h-10 rounded-full"
            onClick={() => dispatch(openCredential())}
          >
            <p className="flex justify-center items-center border border-[#ddba4c] rounded-full text-slate-100 py-1  cursor-pointer">
              Login
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-20">
        <div className="w-1/2 flex flex-col gap-2">
          <p className="text-5xl font-bold text-[#ddba4c]">Welcome to our</p>
          <p className="text-5xl font-bold text-slate-100">
            CENTUMO NFT Marketplace
          </p>
          <p className="text-slate-100">
            "Non-Fungible Tokens (NFTs) are revolutionizing the way digital
            assets like photography, educational content, and e-commerce
            products are created, owned, and traded. In the realm of digital
            photography, NFTs empower photographers to authenticate and sell
            their work in a secure, decentralized marketplace, ensuring that
            each piece is unique and verifiably owned.
          </p>
          <div className="flex w-full">
            <div className="flex flex-col gap-3 w-1/2">
              <div
                onClick={() => dispatch(openCredential())}
                // id="bg-div"
                className="w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">Tutorial</p>
              </div>
              <div
                onClick={() => dispatch(openCredential())}
                // id="bg-div"
                className="w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">
                  {" "}
                  Digital Art and Music
                </p>
              </div>
              <div
                onClick={() => dispatch(openCredential())}
                // id="bg-div"
                className="w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">
                  Digital photography
                </p>
              </div>
              <div
                onClick={() => dispatch(openCredential())}
                // id="bg-div"
                className="w-96 h-16 rounded-full bg-[#9bd4f2] flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">E-Commerce</p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div>
                <p className="text-lg text-slate-100">Total Amount</p>
                <p className="text-6xl font-bold text-[#fff]" id="textshadow">$99,990</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/nft4.png" alt="" />
        </div>
      </div>
      <Login />
    </div>
  );
};
