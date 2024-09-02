import { CrossIcon } from "@/public/icons/icons";
import { artMusicBuyerProile } from "@/redux/slice/artMusicBuyerProfileSlice";
import { removeDialog } from "@/redux/slice/blockOpenModalSlice";
import { artMusicBuyerVerifyProile } from "@/redux/slice/ArtMusicBuyerVerifySlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useThemeColors } from "@/components/utils/useThemeColor";

export const BuyerVerifyModal: React.FC = () => {
  const open = useSelector((state: any) => state.dialog);
  const isDarkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkModeEnable);
  const dispatch = useDispatch();
  const handleVerify = async () => {
    try {
      const result = await dispatch<any>(
        artMusicBuyerVerifyProile({ buyerId: open.id })
      );
      if (result.payload?.success) {
        dispatch(removeDialog({ open: false, type: "" }));
        toast.success(result.payload?.message);
        await dispatch<any>(artMusicBuyerProile({ buyerId: open.id }));
      } else {
        dispatch(removeDialog({ open: false, type: "" }));
        toast.warn("User not found!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-full h-auto sm:w-96 sm:h-40 py-2 px-4"
      style={{ background: colors.dialogBackground }}
    >
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
          Are you sure, want to verify this user?
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={handleVerify}
          className="flex justify-center items-center cursor-pointer text-white w-28 h-12 border rounded-md"
        >
          Verify
        </div>
      </div>
    </div>
  );
};
