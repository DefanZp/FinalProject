import React, { useEffect } from "react"; 
import MegaSLiderView from "./MegaSliderView";
import { fetchMegaSuccess, fetchMegaError } from "../../store/Mega/MegaSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MegaSlider = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.mega);

  useEffect(() => {
    const fetchAllMovieDetails = async () => {

      try {

        const listResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );

        const initialMovies = listResponse.data.results;

        if (initialMovies && initialMovies.length > 0) {
         
          const movieDetailPromises = initialMovies.map(async (movie) => {
            const movieId = movie.id;
            try {
             
              const [detailsResponse, videosResponse] = await Promise.all([
                axios.get(
                 `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                 {
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
                  },
                 }
                ),
                axios.get(
               `https://api.themoviedb.org/3/movie/${movieId}/videos`,
               {
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
                },
               }
                ),
              ]);

          
              const videos = videosResponse.data.results;
              const teaser = videos?.find((video) => 
                video.type === "Teaser" || video.type === "Trailer"
              );

           
              return {
                ...detailsResponse.data,
                teaserYoutubeUrl: teaser?.key
                  ? `https://www.youtube.com/embed/${teaser.key}`
                  : null,
                teaserKey: teaser?.key,
              };
            } catch (fetchDetailError) {
              console.error(
                `Gagal mengambil detail untuk film ID ${movieId}:`,
                fetchDetailError.message
              );
              return null; 
            }
          });

       
          const resolvedMovieDetails = await Promise.all(movieDetailPromises);
          console.log(resolvedMovieDetails);

          dispatch(fetchMegaSuccess(resolvedMovieDetails));

        } else {
          
           dispatch(fetchMegaSuccess([]));
        }
      } catch (fetchListError) {
        console.error("Gagal mengambil daftar film top rated:", fetchListError);
        dispatch(fetchMegaError(fetchListError.message || "Gagal mengambil data"));
      }
    };

    fetchAllMovieDetails();

   
  }, [dispatch]);

  
  return (
    <MegaSLiderView
      loading={loading}
      movies={movies} 
      error={error}
    />
  );
};

export default MegaSlider;