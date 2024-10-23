import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Ensure proper import of router
import { LeftIcon, SearchIcon,  } from '@/public/icons/icons';
import {getTopSellers  } from '@/redux/api/photography/topPhotographySellersApi';

interface Seller {
  sellerId: string;
  sellerName: string;
  totalRevenue: number;
  profile_pic: string;
  totalSales: string;
  email: string;
}

const TopSellers: React.FC = () => {
  const router = useRouter(); // Router hook for navigation
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const [topSellers, setTopSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'revenue' | 'sales'>('revenue');

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const response = await getTopSellers(filterType);
        if (response.data.success) {
          setTopSellers(response.data.data as Seller[]);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, [filterType]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as 'revenue' | 'sales');
  };

  const filteredSellers = topSellers.filter((seller) =>
    seller.sellerName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className={`text-center py-4 ${isDarkEnabled ? "text-white" : "text-black"}`}>Loading...</div>;
  }

  if (error) {
    return <div className={`text-center py-4 ${isDarkEnabled ? "text-white" : "text-black"}`}>Error: {error}</div>;
  }

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-dashboard");
  };

  return (
    <div className={`w-full h-[90vh] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"} rounded-xl shadow-lg`}>
      <div className={`h-16 ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between items-center px-4 shadow-md`}>
        <div className="flex items-center gap-4">
          <div
            onClick={back} // Go back to previous page
            className={`w-12 h-12 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex items-center justify-center rounded-full cursor-pointer`}
          >
            <LeftIcon color="#fff" width="24" height="24" />
          </div>
          <p className={`text-xl font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}>
            Top Sellers by {filterType === 'revenue' ? 'Revenue' : 'Sales'}
          </p>
        </div>
        <div className="relative flex items-center gap-4">
          <select
            onChange={handleFilterChange}
            value={filterType}
            className={`h-12 rounded-full px-4 focus:outline-none ${isDarkEnabled ? "bg-[#1e2a4d] text-white" : "bg-[#f2f2f2] text-black"}`}
          >
            <option value="revenue">Revenue</option>
            <option value="sales">Sales</option>
          </select>

          <div className="relative">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search..."
              className={`w-56 h-12 rounded-full pl-12 focus:outline-none ${isDarkEnabled ? "bg-[#1e2a4d] text-white" : "bg-[#f2f2f2] text-black"}`}
            />
            <div className="absolute top-3 left-3">
              <SearchIcon color="#2e10dc" width="24" height="24" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100%-4rem)] overflow-y-scroll flex flex-wrap items-start gap-6 p-6">
        {filteredSellers.length > 0 ? (
          filteredSellers.map((seller) => (
            <div
              key={seller.sellerId}
              className={`relative w-full sm:w-80 md:w-96 lg:w-72 h-96 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#fff]"} rounded-xl shadow-lg`}
            >
              <div
                className={`h-1/2 rounded-t-xl ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex flex-col items-center justify-center`}
              >
                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src={seller.profile_pic || "/image/profile.png"}
                    alt={seller.sellerName}
                    className="w-full h-full object-cover"
                  />
                  
                </div>
              </div>
              <div
                className={`h-1/2 ${isDarkEnabled ? "bg-[#010844]" : "bg-[#084363]"} rounded-b-xl p-10 flex flex-col items-center`}
              >
                <p className="text-[#fff] text-xl font-semibold">{seller.sellerName}</p>
                <p className="text-[#fff] text-md">{seller.email}</p>
                <p className="text-[#fff] text-md">Total Revenue: {seller.totalRevenue.toFixed(2)}</p>
                <p className="text-[#fff] text-md">Total Sales: {seller.totalSales}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-80 h-80 p-4 flex flex-col justify-center items-center">
              <img src="/image/not-found.png" alt="Not Found" />
              <p className="text-lg font-semibold">No Sellers found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSellers;
