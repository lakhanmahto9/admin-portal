import { LeftIcon, SearchIcon } from "@/public/icons/icons";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getPerticularSellerPhotography } from "@/redux/slice/photography/AllPhotographySlice";
import moment from "moment";

export const PhotographList: React.FC = () => {
  const router = useRouter();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const { id } = router.query;
  const dispatch = useDispatch();
  const photography = useSelector(
    (state: any) => state.photography?.data?.photography || []
  );
  const [sellerph, setSellerph] = useState(photography);
  const image = localStorage.getItem("image");
  const back = () => {
    router.push(
      "/admin-dashboard/seller-photography/photography-seller-details"
    );
  };
  useEffect(() => {
    if (id) {
      callApiToPhotography();
    }
  }, [id]);
  const callApiToPhotography = async () => {
    try {
      await dispatch<any>(getPerticularSellerPhotography({ phsellerId: id }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) =>{
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = sellerph.filter((item: any) =>
        item.title.toLowerCase().includes(query)
      );
      setSellerph(filtered);
    } else {
      setSellerph(photography);
    }
  }
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
        <div className="flex items-center gap-1 sm:gap-4 px-2">
          <div
            onClick={back}
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
              onChange={handleSearch}
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
        {sellerph.length > 0 ? (
          sellerph.map((item: any, index: number) => (
            <div
              key={item._id || index}
              className="w-full md:w-[32%] h-96 rounded-2xl border border-[#ccc]"
            >
              <div
                className={`w-full h-[16%] ${
                  isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                }  rounded-t-2xl flex justify-start items-center gap-2 px-2 py-1`}
              >
                <div>
                  <img
                    src={image || "/image/profile.png"}
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {item.title}
                  </p>
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
              <div
                className={`h-[24%] ${
                  isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                }  rounded-b-2xl px-4 py-2`}
              >
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
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 h-96 p-4 flex flex-col justify-center items-center">
              <img src="/image/not-found.png" alt="" />
              <p className="text-lg font-semibold">Not available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
