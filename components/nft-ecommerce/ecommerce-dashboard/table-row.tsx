import React from "react";
import { SalesDataItem } from "./data-types";
import { useSelector } from "react-redux";
// import { selectDarkMode } from "@/redux/slice/darkModeSlice";

interface TableRowProps {
  item: SalesDataItem;
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
//   const darkModeEnable = useSelector(selectDarkMode);
  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr
      className={``}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-9 w-10 rounded-full"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm `}
        >
          {item.userName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm `}
        >
          {item.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm `}
        >
          {item.price}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm `}
        >
          {item.countryName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm `}
        >
          {formattedDate}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
