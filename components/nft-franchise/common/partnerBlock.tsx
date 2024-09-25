import { CrossIcon } from "@/public/icons/icons";
import { fetchParticularQPartner } from "@/redux/slice/fetchParticularQPartnerSlice";
import { removeDialog } from "@/redux/slice/photography/OpenModalSlice";
import { PartnerBlock } from "@/redux/slice/partnerBlockSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const PartnerBlockModal: React.FC = () => {
  const router = useRouter();
  const open = useSelector((state: any) => state.dialog);
  const { id } = router.query;
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();
  const handleBlock = async () => {
    try {
      setSpin(true);
      const result = await dispatch<any>(PartnerBlock({ userId: open.id }));
      if (result.payload?.success) {
        setSpin(false);
        dispatch(removeDialog({ open: false, type: "" }));
        toast.success(result.payload?.message);
        await dispatch<any>(fetchParticularQPartner({ franchiseId: id }));
      } else {
        setSpin(false);
      }
    } catch (error) {
      setSpin(false);
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
          {spin ? "Wait..." : open.block ? "Unblock" : "Block"}
        </div>
      </div>
    </div>
  );
};
