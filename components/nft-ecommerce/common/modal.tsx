import { Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { VerifyModal } from "./verifyModal";
import  SellerBlockModal  from "./sellerBlockModal";
import { BuyerVerifyModal } from "./buyerVerifyModal";
import { UserblockModal } from "@/components/nft-ecommerce/common/UserblockModal";

export const DialogModal: React.FC = () => {
  const open = useSelector((state: any) => state.dialog);
  return (
    <Dialog
      open={open.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        {open.type === "verify"&&<VerifyModal />}
        {open.type === "sellerBlock"&&<SellerBlockModal />}
        {open.type === "userblock"&&<UserblockModal />}
        {open.type === "buyerVerify"&&<BuyerVerifyModal />}
        {open.type === "sellerVerify"&&< VerifyModal/>}

      </div>
    </Dialog>
  );
};
