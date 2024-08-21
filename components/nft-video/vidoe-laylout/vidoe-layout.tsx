import React, { ReactNode } from "react";

interface VideoLayoutProps {
  children: ReactNode;
}
export const VideoLayout: React.FC<VideoLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};
