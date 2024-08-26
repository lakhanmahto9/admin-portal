import { VideoDashboard } from "@/components/nft-video/video-dashboard/video-dashboard";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import React from "react";

const SellerDashboard : React.FC = () =>{
    return (
        <VideoLayout>
            <VideoDashboard/>
        </VideoLayout>
    )
}
export default SellerDashboard;