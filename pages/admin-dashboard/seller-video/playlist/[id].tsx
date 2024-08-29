import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import PlaylistVideos from "@/components/nft-video/playlistVideos/playlistVideos";
import { useGetPlaylistVideosQuery } from "@/redux/api/creatorApiSlice";

// Define the type for playlist video
interface PlaylistVideos {
  id: string;
  videos: string;
  // Add more properties if available
}

const PlaylistVideosPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  const { data, error, isLoading } = useGetPlaylistVideosQuery(id as string);

  // useEffect to perform actions when data changes
  useEffect(() => {
    console.log("Data has changed:", data);
  }, [id]);

  if (isLoading) return <p className="">Loading...</p>;
  if (error) return <p>Error loading playlist</p>;

  return (
    <VideoLayout>
      <PlaylistVideos videos={data.data.videos} />
    </VideoLayout>
  );
};

export default PlaylistVideosPage;
