import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, fetchError } from "../../store/Upcoming/UpcomingSlice"; 
import axios from "axios";
import CardsUpcomingView from "./CardsUpcomingView";

const CardsUpcoming = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.upcoming);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(fetchSuccess(response.data));
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };

    fetchUpcoming();
  }, [dispatch]);

  return (
    <div className="">
    <CardsUpcomingView data={data} loading={loading} error={error} />
    </div>
  );
};

export default CardsUpcoming;