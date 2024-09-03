import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {BackArrow,NextArrow} from "../../utils/icons"
import { useGetAllArtAndMusicQuery } from "@/redux/api/adminApiSlice";

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

  const { data } = useGetAllArtAndMusicQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const arts: ArtContent[] = data?.data || [];
  const [currentIndex, setCurrentIndex] = useState(0);


  // Collect both artThumbnail and musicThumbnail
  const Images = arts.flatMap((item: ArtContent) => {
    const thumbnails = [];
    if (item.artThumbnail) thumbnails.push(item.artThumbnail);
    if (item.musicThumbnail) thumbnails.push(item.musicThumbnail);
    return thumbnails;
  });

  const totalImages = Images.length;
  const autoAdvanceInterval = 5000; // Adjust auto-advance speed

  useEffect(() => { 
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
      className={`relative p-8 my-8 ml-4 rounded-md h-[95%] `}
      style={{ height: "425px" }}
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
      <div className="absolute bottom-16 left-12 text-white pr-28">
        {/* <img src={LeftArrowIcon} /> */}
        {/* <h2 className="text-white text-18 font-bold">
          Fasted Way to create web page
        </h2>
        <p>
          There’s nothing I really wanted to do in life that I wasn’t able to
          get good at.
        </p> */}
      </div>

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
        <NextArrow width="22" height="20" color="black"/>
      </button>
    </div>
  );
};

export default Slider;
