import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const SearchView = ({
  loading,
  inputValue,
  setInputValue,
  handleSearch,
  filteredData = [],
  handleFilterChange,
  filterOption,
  setCurrentPage,
  currentPage,
  data,
}) => {
  return (
    <>
    <Navbar />
      <section className="pt-7">
        <div
          className="container max-w-full py-9 px-6 lg:px-28 flex flex-col "
        >
        <div className="flex flex-row text-[#a8a8a8] items-center shadow-md  justify-between pl-5 mb-12 rounded-md">
          <div className="flex flex-row gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              className="focus-visible: outline-none bg-transparent"
              type="text"
              placeholder="Cari disini..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-black px-4 py-4 text-white rounded-md"
          >
            Cari
          </button>
        </div>

        <div className=" flex flex-row mb-12 pl-2 gap-3 font-medium">
          <svg
            className="w-[24px] h-[24px] self-center"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z"
                stroke="#000000"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <select value={filterOption} onChange={handleFilterChange} className="bg-transparent">
            <option value="Terpopuler">Terpopuler</option>
            <option value="Terbaru">Terbaru</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-y-8  px-6">
              {filteredData.map((movie) => (
                <Link to={`/detail/${movie.id} `}>
                  <div
                    className="flex-none justify-center items-center w-36 md:w-48 lg:w-48 h-36 md:h-60 lg:h-60 rounded-md"
                    style={{
                      backgroundImage: movie.backdrop_path
                        ? `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                        : "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%), url(https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png)", 
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="flex flex-col justify-end h-full p-3">
                      <h1 className="text-white text-sm font-medium mb-1">
                        {movie?.title
                          ? movie.title.length > 20
                            ? `${movie.title.substring(0, 9)}...`
                            : movie.title
                          : "Judul Tidak Tersedia"}
                      </h1>
                      <h1 className="text-white text-opacity-60 text-[9px] font-medium">
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : "Tahun Tidak Tersedia"}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {data?.total_pages > 1 && (
              <div className="flex justify-center w-fit self-center content-center mt-8 p-1 bg-gray-100 shadow-lg drop-shadow-sm rounded-full">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-black rounded-full"
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
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="px-4 py-2  text-sm font-medium">
                 {currentPage} of {data?.total_pages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, data?.total_pages || 1)
                    )
                  }
                  disabled={currentPage === data?.total_pages}
                  className="px-3 py-2 bg-white rounded-full"
                >
                  <svg
                    class="w-5 h-5 text-black dark:text-white"
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
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchView;
