import React from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const MegaView = ({ loading, movies, error }) => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 1,
        autoplay: true,
        interval: 6000,
        arrows: false,
        height: "70vh",
        breakpoints: {
          768: { height: "50vh" },
          640: { height: "40vh" },
        },
      }}
    >

      {loading ? (
        <SplideSlide className="relative flex items-end justify-start">
       
        <div className="absolute inset-0 w-full h-full bg-gray-800 "></div> 
       
        <div className="relative z-10 p-6 pb-10 md:p-10 md:pb-16 lg:p-16 lg:pb-20 w-full max-w-3xl animate-pulse">
          <div className="h-8 bg-gray-500 rounded w-3/4 mb-4"></div>
  
      
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-500 rounded w-full"></div>
            <div className="h-4 bg-gray-500 rounded w-5/6"></div>
            <div className="h-4 bg-gray-500 rounded w-full"></div>
            <div className="h-4 bg-gray-500 rounded w-4/6"></div>
          </div>
        
          <div className="flex gap-4 justify-left mt-8">
            <div className="h-10 w-28 bg-gray-500 rounded-lg"></div>
          </div>
        </div>
      </SplideSlide>
      
      ):
      (<>
      {movies.map((movie) => (
        <SplideSlide
          key={movie.id}
          className="relative flex items-end justify-start text-white"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-black">
            {movie.teaserYoutubeUrl && (
              <iframe
                title={`${movie.title} teaser`}
                src={`${movie.teaserYoutubeUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.teaserKey}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`} // enablejsapi jika perlu kontrol via JS
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full object-cover origin-center scale-[1.8]"
                loading="lazy"
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-0"></div>

          <div className="relative z-10 p-6 pb-10 md:p-10 md:pb-16 lg:p-16 lg:pb-20 max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-sm md:text-base lg:text-base max-w-2xl mx-auto mb-8">
              {movie.overview}
            </p>
            <Link to={`/detail/${movie.id}`}>
              <div className="flex gap-4 justify-left mt-8">
                <button className="bg-red-600 px-6 py-3 rounded-lg text-sm md:text-base lg:text-base font-semibold hover:bg-red-700 transition">
                  Details
                </button>
              </div>
            </Link>
          </div>
        </SplideSlide>
      ))}
      </>)} 
      
    </Splide>
  );
};

export default MegaView;
