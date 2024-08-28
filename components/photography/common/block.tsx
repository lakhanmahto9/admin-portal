import { CrossIcon } from "@/public/icons/icons";
import { getAllSeller } from "@/redux/slice/photography/AllPhSellerSlice";
import { removeDialog } from "@/redux/slice/photography/OpenModalSlice";
import { phsellerProile } from "@/redux/slice/photography/PhSellerProfile";
import { phsellerVerifyProile } from "@/redux/slice/photography/PhSellerVerify";
import { phsellerBlockProile } from "@/redux/slice/photography/blockSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const BlockModal: React.FC = () => {
  const open = useSelector((state: any) => state.dialog);
  const dispatch = useDispatch();
  const handleBlock = async () => {
    try {
      const result = await dispatch<any>(
        phsellerBlockProile({ sellerId: open.id })
      );
      if (result.payload?.success) {
        dispatch(removeDialog({ open: false, type: ""}));
        toast.success(result.payload?.message);
        await dispatch<any>(getAllSeller());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-auto sm:w-96 sm:h-40 bg-[#025f92] py-2 px-4">
      <div className="flex justify-between">
        <p className="text-xl text-white font-bold">Verify</p>
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
        <p className="text-lg text-[#fff]">
          Are you sure, want to block this user?
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={handleBlock}
          className="flex justify-center items-center cursor-pointer text-white w-28 h-12 border rounded-md"
        >
         {open.block?"Unblock":"Block"}
        </div>
      </div>
    </div>
  );
};
