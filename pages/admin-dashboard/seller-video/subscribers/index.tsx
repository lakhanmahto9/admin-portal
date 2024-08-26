import React from "react";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import Subscribers from "@/components/nft-video/subscribers/subscribers";

const UsersPage: React.FC = () => {
  return (
    <VideoLayout>
      <Subscribers />
    </VideoLayout>
  );
};
export default UsersPage;
