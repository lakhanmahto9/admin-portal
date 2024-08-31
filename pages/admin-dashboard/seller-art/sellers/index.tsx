import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import Seller from "@/components/nft-art-music/sellers/sellers";
import { ArtMusicSeller } from "@/components/nft-art-music/sellers/art-music-seller";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      {/* <Seller /> */}
      <ArtMusicSeller/>
    </ArtLayout>
  );
};
export default ArtDashboard;
