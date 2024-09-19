import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getEcommerceTransaction } from "@/redux/api/ecommerce/dashboardApi"; // Ensure this function exists and is correctly imported
import { useThemeColors } from "@/components/utils/useThemeColor"; // Adjust the import path as necessary
import { useSelector } from "react-redux";

interface Transaction {
  productName: string;
  price: number;
  photo: string;
  size: string;
  quantity: number;
  color: string;
  sellername: string;
  itemsId: string; // Ensure this matches the data structure from the API
}

const CategoriesTransaction: React.FC = () => {
  const router = useRouter();
  const { itemsId } = router.query;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    if (itemsId) {
      const fetchTransaction = async () => {
        try {
          const result = await getEcommerceTransaction(itemsId as string); // Fetch transaction by id
          console.log(result.data.data, "fetchtransaction");
          if (result && result.data) {
            setTransaction(result.data.data);
          }
        } catch (error) {
          setError("Failed to fetch transaction details.");
          console.error("Failed to fetch transaction", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransaction();
    }
  }, [itemsId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold">No transaction data available.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center p-8  border border-gray-200 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
      style={{ background: colors.cardBg, color: colors.text }}
    >
      <h2 className="text-3xl font-extrabold mb-8">Transaction Details</h2>
      <div className="flex items-start  rounded-lg shadow-md p-8 w-full">
        {transaction.photo && (
          <div
            className="relative w-40 h-40 flex-shrink-0 mr-8 mt-2"
            style={{ background: colors.cardBg }}
          >
            <img
              src={transaction.photo}
              alt="Product"
              className="object-cover w-full h-full rounded-lg border border-gray-300"
            />
          </div>
        )}
        <div className="flex flex-col justify-start flex-grow">
          <h3 className="text-2xl font-semibold mb-4">{transaction.productName}</h3>
          <p className="text-xl font-medium  mb-4">Price: ₹{transaction.price.toFixed(2)}</p>
          <div className="text-sm  space-y-2">
            <p><strong>Size:</strong> {transaction.size}</p>
            <p><strong>Quantity:</strong> {transaction.quantity}</p>
            <p><strong>Color:</strong> {transaction.color}</p>
            <p><strong>Seller:</strong> {transaction.sellername}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTransaction;
