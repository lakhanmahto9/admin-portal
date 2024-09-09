import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import { PhotographList } from "@/components/photography/photography-list/photography-list";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const Photographylist: React.FC = () => {
  return (
    <PhotographyLayout>
      <PhotographList />
    </PhotographyLayout>
  );
};
export default WithAuth(Photographylist);
