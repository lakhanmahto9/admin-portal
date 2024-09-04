import { LeftIcon, SearchIcon } from "@/public/icons/icons";
import React, { ChangeEvent, useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { particularSellerArtMusicList } from "@/redux/slice/particularSellerArtMusicSlice";
import moment from "moment";
import { useThemeColors } from "@/components/utils/useThemeColor";

export const SellerArtMusicList: React.FC = () => {
  const isDarkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkModeEnable);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const photography = useSelector(
    (state: any) =>
      state.particularsellersartmusic?.data?.particularSellerArtMusicList || []
  );
  const [sellerArt, setSellerArt] = useState(photography);
   // console.log(photography)
  const image = localStorage.getItem("image");

  const back = () => {
    router.push("/admin-dashboard/seller-art/sellers");
  };

  useEffect(() => {
    if (id) {
      callApiToPhotography();
    }
  }, [id]);

  const callApiToPhotography = async () => {
    try {
      const result = await dispatch<any>(
        particularSellerArtMusicList({ sellerId: id })
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = sellerArt.filter((item: any) =>
        item?.artName.toLowerCase().includes(query)
      );
      setSellerArt(filtered);
    } else {
      setSellerArt(photography);
    }
  };

  return (
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
            className={`w-10 h-10 flex items-center justify-center rounded-full  cursor-pointer ${
              isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
            }`}
          >
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p className={`text-lg font-semibold`} style={{ color: colors.text }}>
            Seller Art/Music
          </p>
        </div>
        <div className="flex px-2 gap-2 items-center">
          <div className="relative">
            <input
              type="text"
                onChange={handleSearch}
              placeholder="Search..."
              className="w-40 h-10 rounded-full pl-10 focus:outline-none"
              style={{background:colors.background,color:colors.text}}
            />
            <div className="absolute top-3 left-2">
              <SearchIcon color="#2e10dc" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
        {sellerArt.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img
              src="/NoData.png"
              alt="No data"
              className="w-3/4 h-3/4 object-contain"
            />
            <p
              className="text-lg font-bold mt-4"
              style={{ color: colors.text }}
            >
              No data
            </p>
          </div>
        ) : (
          sellerArt.map((item: any, index: number) => (
            <div
              key={item._id || index}
              className={`w-[32%] h-96 rounded-2xl border ${
                isDarkModeEnable ? "border-gray-600" : "border[#ccc]"
              }`}
            >
              <div
                className={`w-full h-[16%] rounded-t-2xl flex justify-start items-center gap-2 px-2 py-1 ${
                  isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92] "
                }`}
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
                    {item.artName}
                  </p>
                  <p className="text-sm text-[#e0dfdf]">
                    {moment(item.createdAt).format("MMMM D, YYYY")}
                  </p>
                </div>
              </div>
              <div className="h-[60%]">
                <img
                  src={item.artThumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`h-[24%] rounded-b-2xl px-4 py-2 ${
                  isDarkModeEnable ? "bg-[#051139]" : "bg-[#084363] "
                }`}
              >
                <div>
                  <p className="text-lg font-semibold text-white">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-yellow-500">
                    ${item.price}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      item.copyright ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ©{" : "} {item.copyright ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
