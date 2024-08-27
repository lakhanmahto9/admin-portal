import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import { ArtMusicTransaction } from "@/components/nft-art-music/transaction/transaction";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <ArtMusicTransaction />
    </ArtLayout>
  );
};
export default ArtDashboard;
