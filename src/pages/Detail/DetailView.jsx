import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import DetailsFilm from "../../components/DetailsFilm/DetailsFilm";
import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";

const DetailView = ({
  data,
  loading,
  rating,
  onRate,
  isFavorite,
  onToggleFavorite,
  isWatchlisted,
  onToggleWatchlisted,
  isAuthenticated,
}) => {
  return (
    <>
      <Navbar />
      <section className="">
        <div className="container-fluid w-full">
          <div
            className="px-6 lg:px-28 pb-10 h-[70vh] md:h-[50vh] lg:h-[100vh] content-end bg-black bg-opacity-30 bg-blend-darken"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%), url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {loading === true ? (
              <div
                role="status"
                class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div class="flex items-center justify-center lg:w-80 lg:h-80 bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700">
                  <svg
                    class="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div class="w-full">
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center gap-20">
                <div className="relative hidden lg:min-w-64 lg:h-96 lg:block object-cover rounded-lg">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={
                      data.poster_path
                        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                        : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
                    }
                    alt={data.title}
                  />
                  {rating > 0 && (
                    <p
                      className={`absolute top-3 right-3 bg-white py-1 px-2 rounded-full
                   ${rating < 5 ? "text-red-500" : "text-black"}`}
                    >
                      {rating}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex w-full lg:h-64 place-content-center">
                    <svg
                      className="w-[36px] h-[36px] self-center cursor-pointer text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 18V6l8 6-8 6Z"
                      />
                    </svg>
                  </div>

                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => onRate(star * 2)}
                        className={`text-2xl ${
                          star <= rating / 2
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-6">
                    {`${data.title || ""}` +
                      `(${data.release_date?.slice(0, 4) || ""})`}
                  </h1>
                  <div className="flex flex-col md:flex-row lg:flex-row mb-6">
                    <div className="flex flex-row gap-9">
                      {loading === true ? (
                        <p>Loading...</p>
                      ) : (
                        <p className="text-white text-sm md:text-base lg:text-base mr-16">
                          {Math.floor(data?.runtime / 60) || ""}h{" "}
                          {data.runtime % 60 || ""}m
                        </p>
                      )}
                    </div>

                    <div className="flex flex-row gap-3">
                      {loading === true ? (
                        <p>Loading...</p>
                      ) : (
                        data?.genres?.slice(0, 3).map((genre) => (
                          <p
                            key={genre.id}
                            className="text-white text-sm md:text-base lg:text-base"
                          >
                            {genre?.name}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                  <p className="text-white text-sm md:text-base lg:text-base">
                    Overview <br /> {data.overview}
                  </p>

                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error(
                          "Silahkan login untuk menambahkan ke favorit."
                        );
                        return;
                      }
                      onToggleFavorite();
                      if (isFavorite) {
                        toast.success("Removed from favorites");
                      } else {
                        toast.success("Added to favorites");
                      }
                    }}
                    className={`px-4 py-2 rounded-md mt-4 mr-2 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>

                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error(
                          "Silahkan login untuk menambahkan ke watchlist."
                        );
                        return;
                      }
                      onToggleWatchlisted();
                      if (isWatchlisted) {
                        toast.success("Removed from watchlist");
                      } else {
                        toast.success("Added to watchlist");
                      }
                    }}
                    className={`px-4 py-2 rounded-md mt-4 ${
                      isWatchlisted
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {isWatchlisted
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <DetailsFilm />
          <hr class=" my-16 mx-28 h-[0.3px] border-t-0 bg-neutral-200 dark:bg-white/10" />
          <SimilarMovies />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetailView;
