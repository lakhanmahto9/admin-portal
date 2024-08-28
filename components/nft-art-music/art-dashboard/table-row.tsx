import React from "react";
import { SalesDataItemTwo } from "./data-types";
import { RupeesIcon } from "@/components/utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { useSelector } from "react-redux";

interface TableRowProps {
  item: SalesDataItemTwo;
}


const TableRow: React.FC<TableRowProps> = ({ item }) => {
  const isDarkModeEnabled = useSelector((state:any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkModeEnabled)
  // console.log(item)
  
  const thumbnail = item.artThumbnail || item.musicThumbnail;

  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr>
       <td className="px-6 py-4 whitespace-nowrap">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={item.artName }
            className="h-9 w-10 rounded-full"
          />
        ) : (
          <div className="h-9 w-10 rounded-full bg-gray-200" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{item.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{item.artName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{item.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold flex items-center"><RupeesIcon width="16" height="16" color={colors.text}/>{item.price}</div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{item.countryName}</div>
      </td> */}
       <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{formattedDate}</div>
      </td> 
    </tr>
  );
};

export default TableRow;
