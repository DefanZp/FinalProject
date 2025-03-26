import React, { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, fetchError } from "../../store/NowPlaying/NowPlayingSlice"; 
import axios from "axios";
import CardsNowView from "./CardsNowView";

const CardsNow = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.nowPlaying);
 

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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

    fetchNowPlaying();
  }, [dispatch]);

  return (
    <div className="">
    <CardsNowView data={data} loading={loading} error={error} />
    </div>
  );
};

export default CardsNow;