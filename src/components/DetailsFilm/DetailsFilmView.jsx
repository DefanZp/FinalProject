import {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


const DetailsFilmView = ({
  creditData,
  creditLoading,
  videoData,
  videoLoading,
  splideRef
} ) => {

  

  return (
    <section className="pt-12">
      <div className="container max-w-full px-6 lg:px-28 box-border w-full">
        <div>
          <h1 className="text-2xl font-semibold mb-6">Cast</h1>

          {creditLoading ? (
            <p>Loading...</p>
          )  : (
            <Splide 
                    ref={splideRef}
                    options={{
                      perPage: 5,
                      gap: '1rem',
                      pagination:true,
                      arrows:false,
                      classes: {
                        pagination: 'Pagination_number',
                      },
                      breakpoints: {
                        640: {
                          perPage: 2,
                        },
                        1200: {
                          perPage: 3,
                        }

                      }
                    }}

                  >
              {creditData?.cast?.map((cast) => (
                <SplideSlide
                style ={{
                  paddingBottom: '2px'
                }}
                >
                <Link to={`/cast/${cast.id}`}>
                <div
                  key={cast.id}
                  className="flex flex-col min-w-40 pb-2 md:pb-4 lg:pb-4 rounded-md shadow-md bg-white"
                >
                 
                  <img
                    className="w-full h-48 object-cover bg-center bg-no-repeat rounded-t-md"
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                        : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
                    }
                    alt={cast.name || "Actor"}
                    onError={(e) => {
                      e.target.src =
                        "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png";
                    }}
                  />

               
                  <p className="text-base font-medium text-left text-gray-800 mt-2 px-2">
                    {cast.name}
                  </p>
                </div>
                </Link>
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>

        <hr class=" my-16  h-[0.3px] border-t-0 bg-neutral-200 dark:bg-white/10" />
        <div className="pb-1">
          <h1 className="text-2xl font-semibold mb-6">Videos</h1>

          {videoLoading ? (
            <p>Loading...</p>
          ) : (
            <Splide 
                    options={{
                      perPage: 4,
                      perMove: 1,
                      gap: '1rem',
                      classes: {
                        pagination: 'Pagination',
                        arrows: 'Arrows',
                      },
                      breakpoints: {
                        640: {
                          perPage: 1,
                        },
                        1200: {
                          perPage: 2,
                        }

                      }
                    }}
                  >
              {videoData?.length > 0 ? (
                videoData.map((video) => (
                  <SplideSlide
                  style = {{
                    paddingBottom: '2px'
                  }}
                  >
                  <div
                    key={video.id}
                    className="flex flex-col items-start justify-between  min-w-64 min-h-48 rounded-md shadow-md bg-white pb-3"
                  >
                    
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-48"
                    >
                      <img
                        className="w-full h-48 object-cover rounded-t-md"
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name || "Video Thumbnail"}
                      />
                    </a>

                    <p className="text-base font-medium text-left text-gray-800 py-2 px-2">
                      {video.name && video.name.length > 20
                        ? `${video.name.slice(0, 20)}...`
                        : video.name}
                    </p>

                    <p className="text-base font-medium text-left text-white mt-5 py-2 px-5 mx-2 bg-black rounded-md">{video.type}</p>
                  </div>
                  </SplideSlide>
                ))
              ) : (
                <p>No videos available.</p>
              )}
            </Splide>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsFilmView;