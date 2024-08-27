import React, { useState } from "react";
import { Modal, Button, IconButton } from "@mui/material";
import { AiOutlineClockCircle, AiOutlineCopyrightCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "@/baseUrl";
import { DeleteIcon } from "@/components/utils/icons";

import NoDataImage from "@/public/Nodata.png";

interface CardProps {
  content: {
    _id: string;
    artThumbnail: string;
    artName: string;
    name: string;
    price: number;
    description: string;
    bidding: boolean;
    copyright: boolean;
  };
}

const Card: React.FC<CardProps> = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/admin/delete-art-or-music/${content._id}`
      );
      closeModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Determine if this is the "no data found" card
  const isNoData = content._id === "no-data-found";

  return (
    <div
      className={`card relative m-1 rounded-lg shadow-lg w-full sm:w-72 md:w-[17.5rem] h-auto flex flex-col ${
        darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative">
        <img
          src={isNoData ? NoDataImage.src : content.artThumbnail}
          alt={isNoData ? "No data found" : content.artName}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <p className="text-xl font-semibold mb-2">
            {isNoData ? "No data found" : content.artName}
          </p>
          {!isNoData && (
            <>
              <p className="text-sm mb-2">{content.description}</p>
              <p className="text-sm mb-2">by {content.name}</p>
              <p className="text-2xl font-bold text-yellow-500 mb-4">
                ₹{content.price}
              </p>
            </>
          )}
        </div>
        {!isNoData && (
          <div className="flex items-center justify-between">
            {content.copyright && (
              <span className="flex items-center text-blue-500">
                <AiOutlineCopyrightCircle className="text-lg mr-1" />
                <span className="text-sm">Copyrighted</span>
              </span>
            )}
            {/* {content.bidding && (
              <span className="flex items-center text-green-500">
                <AiOutlineClockCircle className="text-lg mr-1" />
                <span className="text-sm">Bidding</span>
              </span>
            )} */}
            <IconButton
              className="bg-white p-1 rounded-full"
              onClick={openModal}
              color="error"
            >
              <DeleteIcon width="16" height="16" color="red" />
            </IconButton>
          </div>
        )}
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
            <Button variant="contained" color="error" onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
