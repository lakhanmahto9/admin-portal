import { ArtMusicDashboard } from "@/components/nft-art-music/art-dashboard/art-dashboard";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import React from "react";

const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <ArtMusicDashboard />
    </ArtLayout>
  );
};
export default ArtDashboard;
