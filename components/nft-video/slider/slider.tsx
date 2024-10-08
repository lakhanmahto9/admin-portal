import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BackArrow, NextArrow } from "../../utils/icons";

interface Course {
  _id: string;
  creatorId: string;
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
}

const Slider: React.FC = () => {
  const courseData: Course[] =
    useSelector((state: any) => state?.user?.playlist) || [];
  console.log(courseData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const Images = courseData
    .map((course: any) => course.thumbnail)
    .filter((thumbnail: string | undefined) => thumbnail);
  const totalImages = Images.length;
  const autoAdvanceInterval = 5000; // Change this to adjust auto-advance speed

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
      className={`relative p-8 my-8 mb-0  w-full  rounded-md h-[95%] `}
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
        <NextArrow width="22" height="20" color="black" />
      </button>
    </div>
  );
};

export default Slider;
