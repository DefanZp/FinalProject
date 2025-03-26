import React from "react";
import { Link } from "react-router-dom";

const MegaView = ({ loading, selectedMovie }) => {
  return (
    <>
      {loading === true ? (
        <p>Loading...</p>
      ) : (
        <div>
          
          <section
            className="relative h-[60vh] md:h-[40vh] lg:h-[70vh] flex items-end justify-left"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
  
            {selectedMovie?.teaserYoutubeUrl && (
              <iframe
                title="teaser"
                src={selectedMovie.teaserYoutubeUrl + "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + selectedMovie.teaserUrl }
                frameBorder="0"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: -1,
                  scale: "1.6",
                }}
              />
            )}

            
            <div
              className="absolute inset-0 bg-black bg-opacity-20"
              style={{
                zIndex: 1,
              }}
            ></div>

            <div className="relative px-6 pb-8 z-10 text-left text-white lg:px-28 lg:pb-16">
              <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-4">
                {selectedMovie?.title}
              </h1>
              <p className="text-sm md:text-base lg:text-base max-w-2xl mx-auto mb-8">
                {selectedMovie?.overview}
              </p>
              <Link to={`/detail/${selectedMovie?.id}`}>
                <div className="flex gap-4 justify-left mt-8">
                  <button className="bg-red-600 px-6 py-3 rounded-lg text-sm md:text-base lg:text-base font-semibold hover:bg-red-700 transition">
                    Detail
                  </button>
                </div>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default MegaView;