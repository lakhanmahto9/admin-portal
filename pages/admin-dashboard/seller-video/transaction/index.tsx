import { TransactionAdmin } from "@/components/nft-video/transaction/transaction";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import React from "react";

const TransactionPage : React.FC = () =>{
    return (
        <VideoLayout>
            <TransactionAdmin/>
        </VideoLayout>
    )
}
export default TransactionPage;

