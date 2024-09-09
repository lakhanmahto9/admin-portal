import { CrossIcon } from "@/public/icons/icons";
import { getEcommerceBuyersThunk } from "@/redux/slice/ecommerce/getEcommerceBuyersSlice";
import { removeDialog } from "@/redux/slice/photography/OpenModalSlice";
import { blockOrUnblockEcommerceBuyerThunk } from "@/redux/slice/ecommerce/actionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store/store"; // Adjust import based on your setup

export const UserblockModal: React.FC = () => {
  const open = useSelector((state: RootState) => state.dialog);
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleBlock = async () => {
    try {
      setSpin(true);
      const result = await dispatch(
        blockOrUnblockEcommerceBuyerThunk(open.id) // Pass only the buyerId
      );

      if (result.payload?.success) {
        setSpin(false);
        dispatch(removeDialog({ open: false, type: "" }));
        toast.success(result.payload?.message);
        dispatch(getEcommerceBuyersThunk()); // No need for await here
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
      toast.error("An error occurred. Please try again.");
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
        <p className="text-[#fff]">
          Are you sure you want to {open.block ? "unblock" : "block"} this user?
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={handleBlock}
          className="flex justify-center items-center cursor-pointer text-white w-28 h-12 border rounded-md"
        >
          {spin ? "Wait..." : open.block ? "Unblock" : "Block"}
        </div>
      </div>
    </div>
  );
};
