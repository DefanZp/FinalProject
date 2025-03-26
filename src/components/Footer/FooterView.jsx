import React from "react";

const FooterView = () => {
  return (
    <section className="w-full">
     
      <div className="container-fluid w-full flex lg:flex-row md:flex-row flex-col mt-14 lg:mt-28 pt-9 border-t border-gray-400">
   
        <div className="flex flex-col gap-6 px-6 lg:px-28 w-full lg:w-[50%] pb-5">
          <svg
            className="w-[36px] h-[36px] text-gray-800 dark:text-white"
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
          <p className="text-xl sm:text-2xl font-semibold w-full sm:w-[70%]">
            Discover the latest movies, trailers, and reviews.
          </p>
        </div>

        
        <div className="flex flex-row lg:flex-row md:flex-row px-6 justify-between md:justify-end sm:justify-end gap-5 lg:gap-20 w-full lg:w-[50%] lg:pb-16 lg:px-28">
        
          <ul className="flex flex-col font-medium text-sm gap-y-2">
            <li className="text-lg font-semibold">Platform</li>
            <li>Movies</li>
            <li>Trailers</li>
            <li>Streaming</li>
          </ul>

         
          <ul className="flex flex-col font-medium text-sm gap-y-2">
            <li className="text-lg font-semibold">Company</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>

        
          <ul className="flex flex-col font-medium text-sm gap-y-2">
            <li className="text-lg font-semibold">Support</li>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row justify-between w-full bg-black py-6 text-white text-sm px-6 lg:px-28 mt-16">
       
        <p className="text-center lg:text-left">© 2025 YourFilms. All rights reserved</p>

   
        <div className="flex flex-row justify-center lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-0">
          <p className="text-center ">Terms of Service</p>
          <p className="text-center ">Privacy Policy</p>
          <p className="text-center ">Cookies</p>
        </div>
      </div>
    </section>
  );
};

export default FooterView;