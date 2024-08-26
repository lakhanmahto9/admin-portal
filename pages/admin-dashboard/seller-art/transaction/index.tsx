
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import { ArtMusicTransaction } from "@/components/nft-art-music/transaction/transaction";
import React from "react";

const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <ArtMusicTransaction />
    </ArtLayout>
  );
};
export default ArtDashboard;
