import React, { useEffect, useState } from "react";
import MegaView from "./MegaView";
import { dataActions } from "../../store/Data/DataSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Mega = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
  const fetchRandomMovie = async () => {
    try {
    
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      };

      const response = await axios.request(options);
      dispatch(dataActions.fetchSuccess(response.data));

      // randomized
      const movies = response.data.results;
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomId = movies[randomIndex].id;

        // detail
        const movieDetailsOptions = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${randomId}?language=en-US`,
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        };

        const movieDetailsResponse = await axios.request(movieDetailsOptions);

        // fetch video
        const videoOptions = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${randomId}/videos`,
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        };

        const videoResponse = await axios.request(videoOptions);
        const videos = videoResponse.data.results;

        // Cari teaser dan trailer
        const teaser = videos.find(
          (video) =>
            video.type === "Teaser" || video.type === "Trailer"
        );

        // Set state 
        setSelectedMovie({
          ...movieDetailsResponse.data,
          teaserYoutubeUrl: teaser?.key ? `https://www.youtube.com/embed/${teaser.key}` : null,
          teaserUrl: teaser?.key,
        });
      }
    } catch (error) {
      dispatch(dataActions.fetchError(error.message));
    }
  };

  fetchRandomMovie();
}, [dispatch]);

  return (
    <MegaView
      data={data}
      loading={loading}
      error={error}
      selectedMovie={selectedMovie}
    />
  );
};

export default Mega;