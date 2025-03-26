import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSuccess } from "../../store/Cast/CastDetailSlice";
import { fetchMovieSuccess } from "../../store/Cast/CastMovieSlice";
import axios from "axios";
import CardDetailView from "./CastDetailView";
import toast from "react-hot-toast";

const CastDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cast, loading, error } = useSelector((state) => state.castDetail);
  const {
    movieCast,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state) => state.castMovie);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );

        dispatch(fetchSuccess(response.data));
        console.log(response.data);
      } catch (error) {
        toast.error("Gagal memuat daftar Favorit.", error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );

        dispatch(fetchMovieSuccess(response.data));
      } catch (error) {
        toast.error("Gagal memuat daftar Favorit.", error);
      }
    };

    fetchMovieCast();
    fetchCast();
  }, [dispatch, id]);

  return (
    <div>
      <CardDetailView
        cast={cast}
        loading={loading}
        error={error}
        movieCast={movieCast}
        movieLoading={movieLoading}
        movieError={movieError}
      />
    </div>
  );
};

export default CastDetail;
