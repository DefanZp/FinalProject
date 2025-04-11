import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";


const FavoriteView = ({
  favorite,
  favoriteStatus,
  onToggleFavorite,
  isAuthenticated,
}) => {
  return (
    <>
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="px-6 lg:px-28">
          <h1 className="text-2xl font-semibold mb-6">My Favorite</h1>
          <div className="flex flex-row items-center gap-4 mb-10">
            <h1 className="text-sm">Favorite Movies</h1>
            <hr class="flex-grow h-[0.4px] border-t-0 bg-gray-300 dark:bg-white/10" />
            <Link to={"/search"}>
            <button className="px-4 py-2 bg-black text-white rounded-full">
              Add New Movie
            </button>
            </Link>
          </div>
          <div className="grid gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorite.length > 0 ? (
              favorite.map((movie) => (
                <div className="relative w-40 lg:w-56" key={movie.id}>
                  <Link to={`/detail/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full max-h-80 rounded-md"
                    />
                    <h2 className="text-lg font-base mt-3">
                      {movie.title.substring(0, 16) +
                        `(${movie.release_date.slice(0, 4)})`}
                    </h2>
                  </Link>
                  <button 
                  className="absolute top-3 right-3 bg-red-500 p-2 rounded-full"
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error(
                        "Silahkan login untuk menambahkan ke favorit."
                      );
                      return;
                    }
                    onToggleFavorite(movie.id, !favoriteStatus[movie.id]);
                    if (favoriteStatus[movie.id]) {
                      toast.success("Removed from favorites");
                    } else {
                      toast.success("Added to favorites");
                    }
                  }}
                  >
                    <svg
                      class="w-5 h-5 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>

                </div>
              ))
            ) : (
              <p>Belum ada film favorit.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FavoriteView;
