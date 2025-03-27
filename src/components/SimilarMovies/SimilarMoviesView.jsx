import React from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const SimilarMoviesView = ({ data, loading, error, collection }) => {
  return (
    <section className="">
      <div className="container flex flex-col max-w-full px-6 lg:px-28 ">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Related Movie
        </h1>
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
                          perPage: 3,
                        }

                      }
                    }}
                  >

        {collection?.map((collection) => (
            <>
              <SplideSlide>
              <Link to={`/detail/${collection.id}`}>
                <div className="flex flex-col min-w-60 lg:min-w-64 shadow-md rounded-md">
                  <img
                    src={
                      collection.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${collection.backdrop_path}`
                        : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
                    }
                    className="w-full h-44 object-cover rounded-md shadow-md bg-center"
                  />
                  <h1 className="text-center lg:text-start text-base font-medium pl-2 py-2 ">
                    {collection.title && collection.title.length > 24
                      ? `${collection.title.slice(0, 24)}...`
                      : collection.title}
                  </h1>
                </div>
              </Link>
              </SplideSlide>
            </>
          ))}

          {data?.map((movie) => (
            <>
            <SplideSlide>
              <Link to={`/detail/${movie.id}`}>
                <div className="flex flex-col min-w-60 lg:min-w-64 shadow-md rounded-md">
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
                    }
                    className="w-full h-44 object-cover rounded-md shadow-md bg-center"
                  />
                  <h1 className="text-center lg:text-start text-base font-medium pl-2 py-2 ">
                    {movie.title && movie.title.length > 24
                      ? `${movie.title.slice(0, 24)}...`
                      : movie.title}
                  </h1>
                </div>
              </Link>
              </SplideSlide>
            </>
          ))}

          
</Splide>
      </div>
    </section>
  );
};

export default SimilarMoviesView;
