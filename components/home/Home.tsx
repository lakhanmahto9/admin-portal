import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Login } from "../credentials/login";
import { openCredential } from "@/redux/slice/creadentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { TotalPrice } from "@/redux/slice/totalPriceSlice";

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tutorial");
  const router = useRouter();
  const dispatch = useDispatch();
  const {price} = useSelector((state:any)=>state?.price?.price || 0)
  const handleDahsboard = (type: string) => {
    if (type === "video") {
      router.push("/seller-video/seller-dashboard");
    } else if (type === "art") {
      router.push("/seller-art/seller-dashboard");
    }
  };
  useEffect(()=>{
    getAllPrice();
  },[])

  const getAllPrice = async () =>{
    try {
      await dispatch<any>(TotalPrice())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-auto sm:h-screen bg-[#20364b] p-4 sm:pl-10 sm:pr-5 sm:py-7">
      <div className="flex justify-between h-[10%]">
        <div className="">
          <p className="text-slate-100 text-xl sm:text-2xl">Creative</p>
          <p className="text-[#ddba4c] font-semibold text-xl sm:text-2xl">Marketing</p>
        </div>
        <div className="gap-2 h-10 hidden sm:flex ">
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
            className="w-20 h-10 rounded-full"
            onClick={() => dispatch(openCredential(activeTab))}
          >
            <p className="flex justify-center items-center border border-[#ddba4c] rounded-full text-slate-100 py-1  cursor-pointer">
              Login
            </p>
          </div>
        </div>
        <div
            className="w-20 h-10 rounded-full block sm:hidden"
            onClick={() => dispatch(openCredential(activeTab))}
          >
            <p className="flex justify-center items-center border border-[#ddba4c] rounded-full text-slate-100 py-1  cursor-pointer">
              Login
            </p>
          </div>
      </div>
      <div className="w-full h-[90%] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-2 mt-10 order-2 md:order-1">
          <p className="text-3xl md:text-5xl font-bold text-[#ddba4c]">Welcome to our</p>
          <p className="text-3xl md:text-5xl font-bold text-slate-100">
            CENTUMO NFT Marketplace
          </p>
          <p className="text-slate-100">
            &quot;Non-Fungible Tokens (NFTs) are revolutionizing the way digital
            assets like photography, educational content, and e-commerce
            products are created, owned, and traded. In the realm of digital
            photography, NFTs empower photographers to authenticate and sell
            their work in a secure, decentralized marketplace, ensuring that
            each piece is unique and verifiably owned.&quot;
          </p>

          <div className=" flex flex-col md:flex-row w-full">
            <div className="flex flex-col gap-3 w-full md:w-1/2">
              <div
                onClick={() => dispatch(openCredential("Tutorial"))}
                className="w-full md:w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">Tutorial</p>
              </div>
              <div
                onClick={() =>
                  dispatch(openCredential("Digital Art and Music"))
                }
                className="w-full md:w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">
                  {" "}
                  Digital Art and Music
                </p>
              </div>
              <div
                onClick={() => dispatch(openCredential("Digital photography"))}
                className="w-full md:w-96 h-16 bg-[#9bd4f2]  rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">
                  Digital photography
                </p>
              </div>
              <div
                onClick={() => dispatch(openCredential("E-Commerce"))}
                className="w-full md:w-96 h-16 rounded-full bg-[#9bd4f2] flex justify-center items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-[#fff]">E-Commerce</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
              <div>
                <p className="text-lg text-slate-100">Total Amount</p>
                <p className="text-6xl font-bold text-[#fff]" id="textshadow">
                  ${price}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full order-1 md:order-2">
          <img src="/image/nftgif-unscreen.gif" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <Login />
    </div>
  );
};
