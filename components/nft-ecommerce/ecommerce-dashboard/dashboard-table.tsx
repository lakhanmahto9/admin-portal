import React from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface SalesDetails {
  username: string;
  productName: string;
  date: Date;
  country: string;
  price: number;
  quantity: number;
}

interface Props {
  salesDetails: SalesDetails[];
}

const DashboardTable: React.FC<Props> = ({ salesDetails }) => {
  console.log(salesDetails, "sales details");
  
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  if (!Array.isArray(salesDetails)) {
    console.error("Expected salesDetails to be an array, but got:", salesDetails);
    return null;
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl mt-2 w-full ${darkModeEnable ? "" : "shadow-lg shadow-gray-300"} `}
      style={{ maxHeight: "400px", color: colors.text, background: colors.cardBg }}
    >
      <h2 className={`p-4 font-bold text-base `}>
        Sales
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
           
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider `}>
              User Name
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider `}>
              Product Name
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider `}>
              Price
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider `}>
              Country
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider `}>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {salesDetails.map((item, ind) => (
            <tr key={ind} className="hover:bg-gray-100">
             
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
