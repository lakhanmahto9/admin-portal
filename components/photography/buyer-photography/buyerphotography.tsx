import { LeftIcon, SearchIcon } from "@/public/icons/icons";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { buyerPhotography } from "@/redux/slice/photography/AllBuyerPhotography";

export const BuyerPhotography: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const photography = useSelector(
    (state: any) => state.buyerphotography?.data?.buyerphotography || []
  );
  const image = localStorage.getItem("image");
  const back = () => {
    router.push(
      "/admin-dashboard/seller-photography/photography-buyer-details"
    );
  };
  useEffect(() => {
    if (id) {
      callApiToPhotography();
    }
  }, [id]);
  const callApiToPhotography = async () => {
    try {
      await dispatch<any>(buyerPhotography({ buyerId: id }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-full h-[83vh] rounded-xl ${
        isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"
      }`}
    >
      <div
        className={`h-[12%] ${
          isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"
        } rounded-t-xl flex justify-between`}
      >
        <div onClick={back} className="flex items-center gap-2 px-2">
          <div
            className={`w-10 h-10 ${
              isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
            } flex items-center justify-center rounded-full  cursor-pointer`}
          >
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p
            className={`text-lg font-semibold  ${
              isDarkEnabled ? "text-[#fff]" : "text-[#192555]"
            }`}
          >
            Photography
          </p>
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
        {photography.map((item: any, index: number) => (
          <div
            key={item._id || index}
            className="w-full md:w-[32%] h-96 rounded-2xl border border-[#ccc]"
          >
            <div className={`w-full h-[16%] ${isDarkEnabled?"bg-[#040836]":"bg-[#025f92]"} rounded-t-2xl flex justify-start items-center gap-2 px-2 py-1`}>
              <div>
                <img
                  src={image || "/image/profile.png"}
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="text-sm text-[#e0dfdf]">
                  {moment(item.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
            <div className="h-[60%]">
              <img
                src={item.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`h-[24%] ${isDarkEnabled?"bg-[#040836]":"bg-[#025f92]"} rounded-b-2xl px-4 py-2`}>
              <div>
                <p className="text-lg font-semibold text-white">
                  {item.description}
                </p>
                <p className="text-sm font-semibold text-white">
                  ${item.price}
                </p>
                <p className="text-sm font-semibold text-white">
                  ©{" : "} {item.copyright ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
