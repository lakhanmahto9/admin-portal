import { SearchIcon } from "@/public/icons/icons";
import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

export const Transaction: React.FC = () => {
  const totalsell = useSelector((state: any) => state.sale?.data?.sells || []);
  const [sale, setSale] = useState(totalsell);
  const [search, setSearch] = useState("");
  console.log(totalsell)


  const handleSearch = (e:ChangeEvent<HTMLInputElement>) =>{
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = sale.filter((item: any) =>
        item.title.toLowerCase().includes(query)
      );
      setSale(filtered);
    } else {
      setSale(totalsell);
    }
  }

  return (
    <div className="w-full h-96 border bg-[#FFFFFF] rounded-2xl mb-2">
      <div className="h-[15%] border-b flex justify-between items-center px-4">
        <p className="text-xl font-semibold">Transaction</p>
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
      <div className="h-[85%] flex flex-wrap justify-between gap-2 p-2 overflow-y-auto">
        {sale.map((item: any, index: number) => (
          <div key={index} className="w-full md:w-[24%] h-full border rounded-2xl">
            <div className="h-[20%] border-b px-2 flex justify-start items-center">
              <div className="flex flex-start gap-2">
                <div className="w-12 h-12 rounded-full bg-[#391515]">
                  <img
                    src={item?.thumbnail}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="">
                  <p className="text-lg font-bold">{item?.title}</p>
                  <p className="text-sm font-semibold">₹{item?.price}</p>
                </div>
              </div>
            </div>
            <div className="h-[50%] border-b">
                <img src={item?.thumbnail} alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="h-[30%] p-1">
              <div className="leading-5">
                <div className="flex justify-between">
                  <p className="font-semibold text-[#504f4f]">Seller</p>
                  <p className="font-semibold text-[#9595a3]">{item?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-[#504f4f]">Buyer</p>
                  <p className="font-semibold text-[#9595a3]">{item?.buyerId?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-[#504f4f]">Order ID</p>
                  <p className="font-semibold text-[#9595a3]">{item?.orderId}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-[#504f4f]">Date</p>
                  <p className="font-semibold text-[#9595a3]">{moment(item.createdAt).format("MMMM D, YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
