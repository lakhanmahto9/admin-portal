import { Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { VerifyModal } from "./verifyModal";
import { BlockModal } from "./block";

export const DialogModal: React.FC = () => {
  const open = useSelector((state: any) => state.dialog);
  return (
    <Dialog
      open={open.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        {open.type === "veryfy"&&<VerifyModal />}
        {open.type === "block"&&<BlockModal />}
        
      </div>
    </Dialog>
  );
};
