import React from "react";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import Playlist from "@/components/nft-video/playlist/playlist";
import { useRouter } from "next/router";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <VideoLayout>
      <Playlist />
    </VideoLayout>
  );
};
export default UsersPage;
