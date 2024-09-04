import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card"; // Import the Card component
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";
import NoDataImage from "@/public/Nodata.png";
import { fetchTopSellersOnBasisOfSales } from "@/redux/slice/tutorial/fetchTopSellersBasisOfSalesSlice";

// Define TypeScript interfaces for the seller data
interface Seller {
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPic?: string;
  totalSale: number;
  totalRevenue: number;
}

// interface TopSellersResponse {
//   topSellersBySales: Seller[];
// }

const defaultPic = "https://via.placeholder.com/150"; // Default image URL

const SellersByTotalSale: React.FC = () => {
  const [topSellers, setTopSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCardsCount, setVisibleCardsCount] = useState<number>(10); // Default to show 10 cards
  const router = useRouter();
  const dispatch = useDispatch();
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  const callApiToFetchTopSellersBySales = async () => {
    setLoading(true);
    const result = await dispatch<any>(fetchTopSellersOnBasisOfSales());
    console.log(result.meta?.requestStatus); // Verify the data structure here
    if (result.meta?.requestStatus) {
      setTopSellers(result.payload?.topSellersBySales);
    }
    setLoading(false);
  };

  useEffect(() => {
    callApiToFetchTopSellersBySales();
  }, []);

  const filteredSellers = topSellers.filter(
    (seller) =>
      seller.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.sellerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCardsCount(visibleCardsCount + 10); // Increase the number of visible cards
  };

  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-video/seller-dashboard");
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mx-2">
        <button onClick={handleNavigate}>
          <ArrowLeftIcon width="24" height="24" color="#ffffff" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`mb-4 p-2  rounded`}
          style={{ background: colors.cardBg }}
        />
      </div>

      <div className="w-full flex flex-wrap justify-center">
        {filteredSellers.length > 0 ? (
          filteredSellers
            .slice(0, visibleCardsCount)
            .map((seller) => <Card key={seller.sellerId} content={seller} />)
        ) : (
          <div className="flex flex-col bg-[#fefefe] shadow-md rounded-md items-center mt-10">
            <img
              src={NoDataImage.src}
              alt="No data found"
              className="w-72 h-72 object-cover"
            />
            <p
              className="mt-4 text-lg font-semibold"
              style={{ color: colors.text }}
            >
              No data found
            </p>
          </div>
        )}
      </div>

      {visibleCardsCount < filteredSellers.length && (
        <div className="flex justify-center items-start mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default SellersByTotalSale;
