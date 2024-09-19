import React from "react";
import { RightGo } from "../../utils/icons"; // Assuming you have this icon utility
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { useRouter } from "next/router"; // Import useRouter from next/router

interface CategoriesProps {
  transactions: {
    productName: string;
    price: number;
    photo: string; // URL or path to the product photo
    itemId: string; // Add itemsId to the transaction type
  }[];
}

const Categories: React.FC<CategoriesProps> = ({ transactions }) => {
  console.log(transactions, "transac")
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const router = useRouter(); // Initialize useRouter

  const handleDetailsClick = (itemId: string) => {
    // Navigate to the details page with itemsId
    router.push(`/admin-dashboard/nft-ecommerce/transaction-details/${itemId}`); // Adjust the path based on your routing setup
  };

  return (
    <div
      className={`overflow-y-auto p-3 rounded-lg ${
        darkModeEnable ? "" : "shadow-lg shadow-gray-300"
      }`}
      style={{ maxHeight: "400px", background: colors.cardBg, color: colors.text }}
    >
      <h3 className="font-bold">Transactions</h3>
      <div>
        {transactions.map((transaction) => (
          <div
            key={transaction.itemId} // Use itemsId as the key
            className="flex items-center space-x-4 mt-2 justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={transaction.photo}
                alt={transaction.productName}
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{transaction.productName}</p>
                <p>${transaction.price}</p>
              </div>
            </div>
            <span className="pr-6 cursor-pointer">
              <RightGo
                width="16"
                height="16"
                color={colors.text}
                className="cursor-pointer"
                onClick={() => handleDetailsClick(transaction.itemId)} // Pass itemsId to the handler
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
