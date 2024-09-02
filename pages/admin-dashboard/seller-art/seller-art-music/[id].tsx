import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import { SellerArtMusicList } from "@/components/nft-art-music/seller-art-music/sellerArtMusic";


const SellerArtMusicPage: React.FC = () => {
  return (
    <ArtLayout>
      <SellerArtMusicList/>
    </ArtLayout>
  );
};
export default SellerArtMusicPage;
