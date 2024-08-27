import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, IconButton } from "@mui/material";
import {
  AiOutlineClockCircle,
  AiOutlineCopyrightCircle,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import BASE_URL from "@/baseUrl";
import { CopyRightIcon, RupeesIcon } from "@/components/utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface ContentType {
  artName: string;
  description: string;
  price: number;
  name: string;
  _id: string;
  musicThumbnail: string;
  music: string;
  bidding: boolean;
  copyright: boolean;
}

interface CardProps {
  item: ContentType;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          const durationMinutes = Math.floor(audioRef.current.duration / 60);
          const durationSeconds = Math.floor(audioRef.current.duration % 60);
          setDuration(
            `${durationMinutes}:${
              durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
            }`
          );
        }
      };

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          const currentMinutes = Math.floor(audioRef.current.currentTime / 60);
          const currentSeconds = Math.floor(audioRef.current.currentTime % 60);
          setCurrentTime(
            `${currentMinutes}:${
              currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
            }`
          );
        }
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteMusic = async () => {
    try {
      // Adjust the base URL and endpoint as needed
      await axios.delete(`${BASE_URL}/admin/delete-art-or-music/${item._id}`);
      closeModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div
      className={`card m-4 w-80 p-3 flex flex-col rounded-lg shadow-lg overflow-hidden  relative ${
        darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"
      }`}
    >
      <img
        src={item.musicThumbnail}
        alt={item.artName}
        className="w-full h-[58%]"
      />
      <div className="flex flex-col mt-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl " style={{ color: colors.text }}>
            {item.artName}
          </p>
          <span className="">
            {" "}
            <IconButton
              className="absolute top-2 right-2 z-10"
              onClick={openModal}
              color="error"
            >
              <AiOutlineDelete />
            </IconButton>
          </span>
        </div>
        <p className="font-semibold text-lg " style={{ color: colors.text }}>
          By: {item.name}
        </p>
        <span className="flex justify-between mt-1 ">
          <p className="flex items-center text-yellow-500">
            <RupeesIcon width="18" height="18" color="gray" />
            {item.price}
          </p>
          <p
            className={`flex gap-2 items-center ${
              item.copyright ? "text-green-500" : "text-red-500"
            }`}
          >
            <CopyRightIcon width="20" height="20" color="blue" />{" "}
            {item.copyright ? "Yes" : "No"}
          </p>
        </span>
        {/* <span className="flex gap-2">
          <p className="font-semibold text-gray-600">Bidding</p>
          <p
            className={`ml-1 ${
              item.bidding ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.bidding ? "Yes" : "No"}
          </p>
        </span> */}
        <span className="flex mt-2">
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload"
            className="h-8" // This sets the width to 12rem (48 * 0.25rem)
          >
            <source src={item.music} type="audio/mpeg" />
          </audio>
        </span>

        <p className="mt-2" style={{ color: colors.text }}>
          {item.description}
        </p>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="confirm-delete-modal"
        aria-describedby="confirm-delete-description"
      >
        <div
          className={`p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-20 ${
            darkModeEnable ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h2 id="confirm-delete-modal" className="text-xl font-semibold mb-4">
            Confirm Delete
          </h2>
          <p id="confirm-delete-description" className="mb-4">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-end gap-4">
            <Button variant="outlined" color="primary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteMusic}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
