import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const CardsPopularView = ({ data, loading }) => {

  
  return (
    <section className="container pt-9 mb-9">
      <div className="w-full"></div>


      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Top Rated</h1>
        
      </div>

      <Splide 
        options={{
          perPage:5,
          perMove: 1,
          gap: '1rem',
          classes: {
            pagination: 'Pagination',
            arrows: 'Arrows',
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
        {loading === true ? (
          <p>Loading...</p>
        ) : (
          data?.results?.map((movie) => (
            <SplideSlide
            >
            <Link to={`/detail/${movie.id}`}>
              <div
                className="flex-none w-48 h-60 rounded-md"
                style={{
                  backgroundImage: movie.backdrop_path 
                  ? `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                  : "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%),url(https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-col justify-end h-full p-3">
                  <h1 className="text-white text-sm font-medium mb-1">
                    {movie?.title.length > 20
                      ? `${movie?.title.substring(0, 9)}...`
                      : movie?.title}
                  </h1>
                  <h1 className="text-white text-opacity-60 text-[9px] font-medium">
                    {movie?.release_date?.slice(0, 4)}
                  </h1>
                </div>
              </div>
            </Link>
            </SplideSlide>
          ))
        )}
      </Splide>

    </section>
  );
};

export default CardsPopularView;
