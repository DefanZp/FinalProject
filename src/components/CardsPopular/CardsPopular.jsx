import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, fetchError } from "../../store/Popular/PopularSlice"; 
import axios from "axios";
import CardsPopularView from "./CardsPopularView";

const CardsPopular = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.popular);

  useEffect(() => {
    const fetchPopular = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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

    fetchPopular();
  }, [dispatch]);

  return (
    <div className="">
    <CardsPopularView data={data} loading={loading} error={error} />
    </div>
  );
};

export default CardsPopular;