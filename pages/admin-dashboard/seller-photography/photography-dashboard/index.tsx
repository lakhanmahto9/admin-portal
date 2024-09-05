import { Photographydashboard } from "@/components/photography/photography-dashboard/photography-dashboard";
import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const PhotographyDashboard: React.FC = () => {
  return (
    <PhotographyLayout>
      <Photographydashboard />
    </PhotographyLayout>
  );
};
export default WithAuth(PhotographyDashboard);
