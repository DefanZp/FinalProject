import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { startFetching, fetchSuccess, addFavorite, removeFavorite } from "../../store/Favorite/FavoriteSlice";
import FavoriteView from "./FavoriteView";
import toast from "react-hot-toast";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favorite, favoriteStatus, loading, error } = useSelector((state) => state.favorite);
  const { isAuthenticated } = useSelector((state) => state.login);

  const sessionId = localStorage.getItem("sessionToken");
  const accountId = localStorage.getItem("userId");

  const addToFavorites = async (movieId, favorite) => {

    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: favorite,
      }),
    };

    try {
      const response = await fetch(`${url}?session_id=${sessionId}`, options);
      const result = await response.json();
      console.log("Favorite status updated:", result);

      
      if (favorite) {
        dispatch(addFavorite({ movieId }));
      } else {
        dispatch(removeFavorite({ movieId }));
      }
    } catch (error) {
      toast.error("Gagal menambahkan ke daftar favorit.", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        dispatch(startFetching());
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
            params: {
              session_id: sessionId,
              language: "en-US",
            },
          }
        );

        dispatch(fetchSuccess(response.data.results));
      } catch (err) {
        toast.error("Gagal memuat daftar Favorit.", err);
      }
    };

    fetchFavorites();
  }, [dispatch, sessionId, accountId]);

  return (
    <FavoriteView
      favorite={favorite}
      favoriteStatus={favoriteStatus}
      loading={loading}
      error={error}
      onToggleFavorite={(movieId, favorite) => addToFavorites(movieId, favorite)}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default Favorite;