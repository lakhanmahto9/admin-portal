import { CrossIcon } from "@/public/icons/icons";
import { getAllSeller } from "@/redux/slice/photography/AllPhSellerSlice";
import { removeDialog } from "@/redux/slice/blockOpenModalSlice";
import { sellerBlockProile } from "@/redux/slice/sellerBlockSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetSellersQuery } from "../../../redux/api/adminApiSlice";

export const BlockModal: React.FC = () => {
  const open = useSelector((state: any) => state.dialog);
  const dispatch = useDispatch();
  const { refetch } = useGetSellersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const handleBlock = async () => {
    console.log(open.id)
    try {
      const result = await dispatch<any>(
        sellerBlockProile({ userId: open.id })
      );
      if (result.payload?.success) {
        dispatch(removeDialog({ open: false, type: "" }));
        toast.success(result.payload?.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-auto sm:w-96 sm:h-40 bg-[#025f92] py-2 px-4">
      <div className="flex justify-between">
        <p className="text-xl text-white font-bold">Block</p>
        <p
          className="cursor-pointer"
          onClick={() =>
            dispatch(removeDialog({ open: false, type: "", id: "" }))
          }
        >
          <CrossIcon color="#fff" width="20" height="20" />
        </p>
      </div>
      <div className="mt-5 px-5">
        <p className="text-md text-[#fff]">
          Are you sure, want to {open.block ? "unblock" : "block"} this user?
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={handleBlock}
          className="flex justify-center items-center cursor-pointer text-white w-28 h-12 border rounded-md"
        >
          {open.block ? "Unblock" : "Block"}
        </div>
      </div>
    </div>
  );
};
