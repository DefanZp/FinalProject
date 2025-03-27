// NavbarView.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavbarView = ({
  isMenuOpen,
  handleToggleMenu,
  handleCloseMenu,
  handleLogout,
  isAuthenticated,
  username,
}) => {
  return (
    <nav className="container-fluid bg-white shadow-md">
      <div className="flex flex-row justify-between items-center py-4 px-6 lg:px-28">
        <Link to={"/"}>
        <svg
          className=" w-9 h-9 text-gray-800 dark:text-white"
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
            strokeWidth="2"
            d="M8 18V6l8 6-8 6Z"
          />
        </svg>
        </Link>

        <div className="hidden lg:flex gap-12">
          <Link to={"/"}>
            <p className="cursor-pointer ">Home</p>
          </Link>
          {isAuthenticated && (
            <>
              <Link to={"/favorite"}>
                <p className="cursor-pointer">Favorite</p>
              </Link>
              <Link to={"/watchlist"}>
                <p className="cursor-pointer">Watchlist</p>
              </Link>
            </>
          )}
          <p className="cursor-pointer ">About Us</p>
          <p className="cursor-pointer ">Tv Series</p>
        </div>

        <div className="flex gap-4 lg:gap-8">
          <Link to={"/search"}>
            <svg
              className="hidden lg:block w-6 h-6 text-gray-800 dark:text-white"
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
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </Link>
          <svg
            className="hidden lg:blockw-6 h-6 text-gray-800 dark:text-white"
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
              strokeWidth="2"
              d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
            />
          </svg>
          {!isAuthenticated ? (
            <Link to={"/login"}>
              <svg
                className="hidden lg:block w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
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
                  strokeWidth="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          ) : (
            <>
            <div className="hidden lg:flex flex-row gap-4">
            {username}
            <svg
              onClick={handleLogout}
              cursor={"pointer"}
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
              />
            </svg>
            </div>
            </>
          )}
        </div>

        <button className="lg:hidden w-8 h-8" onClick={handleToggleMenu}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden  flex flex-col gap-6 py-6 px-6 bg-white text-black shadow-inner">

          <div className="self-center">
          {!isAuthenticated ? (
            <Link to={"/login"}>
              <svg
                className=" w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
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
                  strokeWidth="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          ) : (
            <>
            <div className="flex flex-row gap-4">
            {username}
            <svg
              onClick={handleLogout}
              cursor={"pointer"}
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
              />
            </svg>
            </div>
            </>
          )}
          </div>
          <Link to={"/"} onClick={handleCloseMenu}>
            <p className="cursor-pointer ">Home</p>
          </Link>
          {isAuthenticated && (
            <>
            <Link to={"/favorite"} onClick={handleCloseMenu}>
              <p>Favorite</p>
            </Link>
            <Link to={"/watchlist"} onClick={handleCloseMenu}>
            <p>Watchlist</p>
          </Link>
          </>
          )}
          <p className="cursor-pointer ">About Us</p>
          <p className="cursor-pointer ">Tv Series</p>
        </div>
      )}
    </nav>
  );
};

export default NavbarView;
