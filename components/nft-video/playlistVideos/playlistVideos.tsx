import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BackArrow } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";

// Define the type for playlist video
interface PlaylistVideo {
  _id: string;
  title: string;
  video: string;
  thumbnail: string;
  description: string;
  pdf?: string; // Make pdf optional since it might not be available for all videos
}

interface Props {
  videos: PlaylistVideo[];
}

const PlaylistVideos: React.FC<Props> = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState<PlaylistVideo>(videos[0]);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const router = useRouter();

  const shadowColor = darkModeEnable ? "#4B5563" : "lightgray";

  const handleVideoClick = (video: PlaylistVideo) => {
    setCurrentVideo(video);
  };

  const style = {
    boxShadow: `1px 1px 3px 2px ${shadowColor}`,
  };

  const goBack = () => {
    router.push("/seller-video/playlist");
  };

  return (
    <div
      className={`mt-5  flex rounded-xl  p-5 shadow-md `}
      style={{background:colors.cardBg,color:colors.text}}
    >
      <div className="w-2/3 pr-5">
        <div className="flex items-center gap-2 ">
          <span className="cursor-pointer" onClick={goBack}>
            <BackArrow
              width="24"
              height="24"
              color={darkModeEnable ? "white" : "black"}
            />
          </span>
          <h2 className={`${darkModeEnable ? "text-white" : "text-black"}`}>
            {currentVideo.title}
          </h2>
        </div>
        <video controls className="w-full">
          <source src={currentVideo.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={`${darkModeEnable ? "text-gray-400" : "text-gray-700"}`}>
          {currentVideo.description}
        </p>
        {currentVideo.pdf && (
          <a
            href={currentVideo.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            PDF Link
          </a>
        )}
      </div>
      <div className="w-1/3 overflow-y-auto p-2" style={{ maxHeight: "80vh" }}>
        {videos.map((video) => (
          <div
            key={video._id}
            className={`mb-4  ${
              darkModeEnable
                ? "bg-[#0E1A49]  hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } rounded cursor-pointer`}
            onClick={() => handleVideoClick(video)}
            style={style}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="mb-2 rounded"
            />
            <h3 className={`${darkModeEnable ? "text-white" : "text-black"}`}>
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideos;
