import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BackArrow, NextArrow } from "../../utils/icons";
import { useGetAllArtAndMusicQuery } from "@/redux/api/adminApiSlice";
import { fetchAllArtAndMusic } from "@/redux/slice/fetchAllArtAndMusicSlice";

interface Course {
  _id: string;
  creatorId: string;
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string; // Assuming this is the property name for the thumbnail
}

interface ArtContent {
  _id: string;
  artThumbnail: string;
  musicThumbnail?: string;
  artName: string;
  name: string;
  price: number;
  description: string;
  bidding: boolean;
  copyright: boolean;
}

const Slider: React.FC = () => {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState<ArtContent[]>([]);

  // Collect both artThumbnail and musicThumbnail
  const Images = sliderData.flatMap((item: ArtContent) => {
    const thumbnails = [];
    if (item.artThumbnail) thumbnails.push(item.artThumbnail);
    if (item.musicThumbnail) thumbnails.push(item.musicThumbnail);
    return thumbnails;
  });

  const totalImages = Images.length;
  const autoAdvanceInterval = 5000; // Adjust auto-advance speed
  const callApiToFetchAllArtAndMusic = async () => {
    try {
      const result = await dispatch<any>(fetchAllArtAndMusic());
      const fetchedData = result?.payload?.data || [];
      setSliderData(fetchedData);
    } catch (error) {
      console.log("something went wrong in slider data ")
    }
  };
  useEffect(() => {
    callApiToFetchAllArtAndMusic();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [totalImages]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <div
      className={`relative w-full flex justify-center items-center p-8 my-8 mb-0  rounded-md h-[95%] `}
      style={{ height: "400px" }}
    >
      {Images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-md transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
   
      <button
        className="absolute top-4 right-16 bg-blue-700 text-white px-2 py-1 rounded"
        onClick={goToPrevious}
      >
        <BackArrow width="22" height="20" color="black" />
      </button>
      <button
        className="absolute top-4 right-4 bg-blue-700 text-white px-2 py-1 rounded"
        onClick={goToNext}
      >
        <NextArrow width="22" height="20" color="black" />
      </button>
    </div>
  );
};

export default Slider;
