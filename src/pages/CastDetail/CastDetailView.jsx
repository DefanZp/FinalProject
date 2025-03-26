import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const CastDetailView = ({ cast, loading, error, movieCast, movieLoading, movieError }) => {
  return (
    <>
      <Navbar />

      <section className="pt-16">
        <div className="container flex flex-row max-w-full px-28 gap-16">
          <div className=" w-[30%]  rounded-lg ">
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500${cast?.profile_path}`
                  : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
              }
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <h1 className="text-lg font-semibold mt-5">Place Of Birth</h1>
            <p className="mb-4 text-sm">
              {cast?.place_of_birth && cast?.place_of_birth.length > 24
                ? `${cast?.place_of_birth.slice(0, 24)}...`
                : cast?.place_of_birth}
            </p>
            <h1 className="text-lg font-semibold ">Birthday</h1>
            <p className="text-sm mb-4">{cast?.birthday}</p>

            <h1 className="text-lg font-semibold ">Gender</h1>
            {cast?.gender === 1 ? "Female"
              : cast?.gender === 2 ? "Male"
              : "Unknown"}
          </div>

          <div className="w-[70%]">
            <div className="flex flex-row items-center mt-4 mb-8 gap-2">
              <p className="text-3xl font-semibold ">{cast?.name}</p>
              <p className="text-xl bg-black text-white font-medium py-1 px-2">
                {cast?.known_for_department}
              </p>
            </div>
            <h1 className="text-xl font-semibold mb-3">Biography</h1>
            <p className="text-base mb-8">
              {cast?.biography && cast?.biography.length > 300
                ? `${cast?.biography.slice(0, 600)}...`
                : cast?.biography}
            </p>

            <h1 className="text-xl font-semibold mb-3">Film</h1>    
            <div className="flex flex-row gap-4 overflow-scroll no-scrollbar w-full pb-1">
              {movieCast?.cast?.map((movie) => (
                <>
                <Link to={`/detail/${movie.id}`}>
                <div className="flex flex-col rounded-md shadow-md justify-center pb-3 gap-3">
                  <img src={ 
                    movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png"
                   }
                   className="min-w-40 h-52 object-cover rounded-md bg-center bg-no-repeat" />
                  <h1 className="pl-2 text-base font-medium">
                    {movie.title && movie.title.length > 15
                    ? `${movie.title.slice(0,15)}...`
                    : movie.title
                    }
                   </h1>
                </div>
                </Link>
                </>
              ))}
            </div>  
              
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CastDetailView;
