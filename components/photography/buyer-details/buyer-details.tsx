import {
  LeftIcon,
  SearchIcon,
  ThreedotIcon,
  VerifyIcon,
} from "@/public/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setDialog } from "@/redux/slice/photography/OpenModalSlice";
import { DialogModal } from "../common/modal";
import { ChangeEvent, useState } from "react";


export const AllBuyerDetails: React.FC = () => {
  const router = useRouter();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const phbuyer = useSelector((state: any) => state.buyer?.data?.buyer || []);
  const [buyer, setBuyer] = useState(phbuyer);
  const [search, setSearch] = useState("");
 
  const dispatch = useDispatch();

  const buyerPhotography = (item: any) => {
    // localStorage.setItem("image", item.profile_pic);
    router.push(
      `/admin-dashboard/seller-photography/buyerphotography/${item._id}`
    );
  };
  const back = () => {
    router.push("/admin-dashboard/seller-photography/photography-dashboard");
  };

  const profile = (item: any) => {
    router.push(
      `/admin-dashboard/seller-photography/buyerprofile/${item?._id}`
    );
  };
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) =>{
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = buyer.filter((item: any) =>
        item.name.toLowerCase().includes(query)
      );
      setBuyer(filtered);
    } else {
      setBuyer(phbuyer);
    }
  }
  return (
    <>
      <div
        className={`w-full h-[83vh]  ${
          isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"
        } rounded-xl`}
      >
        <div
          className={`h-[12%] ${
            isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"
          } rounded-t-xl flex justify-between`}
        >
          <div className="flex items-center gap-4 px-2">
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
              All Buyer
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
          {buyer.length > 0 ? (
            buyer.map((item: any, index: number) => (
              <div className="relative w-full md:w-[32%] h-72" key={index}>
                <div
                  className={`h-2/3 rounded-t-2xl ${
                    isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                  } flex justify-center items-center`}
                >
                  <div className="relative w-28 h-28 rounded-full border">
                    <img
                      src={item.profile_pic || "/image/profile.png"}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute bottom-2 right-2">
                      <VerifyIcon
                        color={item.isApproved ? "#00ff00" : "#ff0000"}
                        height="20"
                        width="20"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`h-1/3 ${
                    isDarkEnabled ? "bg-[#010844]" : "bg-[#084363]"
                  } rounded-b-2xl py-5`}
                >
                  <div className="flex gap-2 h-14 px-2">
                    <div
                      onClick={() => buyerPhotography(item)}
                      className={`w-1/2  ${
                        isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                      } cursor-pointer rounded-lg flex justify-center items-center`}
                    >
                      <p className="text-[#fff]">Photography</p>
                    </div>
                    <div
                      onClick={() => profile(item)}
                      className={`w-1/2 ${
                        isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                      } cursor-pointer rounded-lg flex justify-center items-center`}
                    >
                      <p className="text-[#fff]">Profile</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 ${
                    isDarkEnabled ? "bg-[#03061e]" : "bg-[#2c8993]"
                  } rounded-full`}
                >
                  <p className="text-[#fff]">
                    {item.isBlocked ? "Blocked" : "Unblocked"}
                  </p>{" "}
                </div>
                <div
                  onClick={() =>
                    dispatch(
                      setDialog({
                        open: true,
                        type: "userblock",
                        id: item._id,
                        block: item.isBlocked,
                      })
                    )
                  }
                  className={`flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2   ${
                    isDarkEnabled ? "bg-[#03061e]" : "bg-[#2c8993]"
                  } rounded-full`}
                >
                  <ThreedotIcon width="20" height="20" color="#fff" />
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
      <DialogModal />
    </>
  );
};
