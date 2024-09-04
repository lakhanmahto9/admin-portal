import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetPlaylistsQuery,
  useDeletePlaylistMutation,
} from "@/redux/api/adminApiSlice";
import { fetchAllPlaylist } from "@/redux/slice/tutorial/fetchAllPlaylistSlice";
import { useSelector,useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { ArrowLeftIcon } from "../../utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";
import NoDataImage from "@/public/Nodata.png"; // Adjust the path as necessary
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Playlist {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  averageRating: number;
  price: number;
  courseID: string;
}

const Playlist: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [deletePlaylistMutation] = useDeletePlaylistMutation();
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  const callApiToFetchAllPlaylist = async () => {
    setLoading(true); 
    const result = await dispatch<any>(fetchAllPlaylist())
    console.log(result.payload.data)
    if (result.payload?.success) {
      setPlaylists(result?.payload?.data?.playlists);
      // setFilteredBuyers(result?.payload?.data?.buyers);
    }
    setLoading(false);
  }
  useEffect(() => {
    callApiToFetchAllPlaylist();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/admin-dashboard/seller-video/playlist/${id}`);
  };

  const openDialog = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedPlaylist(null);
    setIsDialogOpen(false);
  };

  const handleDeletePlaylist = async () => {
    if (selectedPlaylist) {
      try {
        await deletePlaylistMutation(selectedPlaylist);
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist._id !== selectedPlaylist)
        );
        closeDialog();
      } catch (error) {
        console.error("Error deleting playlist:", error);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-video/seller-dashboard");
  };

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (playlist.price &&
        playlist.price
          .toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mt-5">
      <div className="flex justify-between mb-2">
        <span className="">
          <button onClick={handleNavigate}>
            <ArrowLeftIcon width="24" height="24" color="white" />
          </button>
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className={`px-3 mr-2 py-2 rounded-md border focus:outline-none`}
          style={{ background: colors.cardBg, color: colors.text }}
        />
      </div>
      
      {loading  ? (
        <div className="flex  justify-center items-center mt-20">
          <CircularProgress />
          <p className=""style={{color:colors.text}}>loading...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map(
              ({
                _id,
                thumbnail,
                title,
                description,
                averageRating,
                price,
                courseID,
              }) => (
                <div
                  key={_id}
                  className={`w-72 ${
                    darkModeEnable
                      ? "bg-[#0E1A49] text-[#D3D3D3] shadow-sm shadow-gray-600 "
                      : "bg-white text-black shadow-md shadow-gray-400 "
                  } shadow-lg rounded-md mb-5 cursor-pointer`}
                  onClick={() => handleCardClick(courseID)}
                >
                  <img
                    className="rounded-t-md h-36 w-72"
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                  />
                  <div className="mt-2 px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight">
                      {title}
                    </h5>
                    <p className="mt-2 text-sm mb-3">{description}</p>
                    <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < averageRating
                                ? "text-yellow-300"
                                : `${
                                    darkModeEnable
                                      ? "text-gray-600"
                                      : "text-gray-200"
                                  }`
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xl font-bold">${price}</p>
                    <button
                      className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDialog(_id);
                      }}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div
              className={`w-72 ${
                darkModeEnable
                  ? "bg-[#0E1A49] text-[#D3D3D3] shadow-sm shadow-gray-600 "
                  : "bg-white text-black shadow-md shadow-gray-400 "
              } shadow-lg rounded-md mb-5 flex flex-col items-center justify-center p-1`}
            >
              <img
                className="rounded-t-md h-56 w-72 object-cover"
                src={NoDataImage.src}
                alt="No data found"
              />
              <div className="mt-2 px-5 pb-5 text-center">
                <h5 className="text-xl font-semibold tracking-tight">
                  No data found
                </h5>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "red" }}>{"Confirm Delete"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this playlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePlaylist} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Playlist;
