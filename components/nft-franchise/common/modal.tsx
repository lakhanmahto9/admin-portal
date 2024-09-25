import { Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { VerifyModal } from "./verifyModal";
import { BlockModal } from "./block";
import { PartnerBlockModal } from "./partnerBlock";
import { PartnerVerifyModal } from "./partnerVerify";



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
        {open.type === "block"&&<BlockModal />}
        {open.type === "partnerBlock"&&<PartnerBlockModal />}
        {open.type === "partnerVerify"&&<PartnerVerifyModal />}
      </div>
    </Dialog>
  );
};
