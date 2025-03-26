import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { startFetching, fetchSuccess, addWatchlist, removeWatchlist } from "../../store/WatchList/WatchListSlice";
import WatchlistView from "./WatchListView";
import toast from "react-hot-toast";

const WatchList = () => {
  const dispatch = useDispatch();
  const { watchlist, watchlistStatus, loading, error } = useSelector((state) => state.watchlist);
  const { isAuthenticated } = useSelector((state) => state.login);

  const sessionId = localStorage.getItem("sessionToken");
  const accountId = localStorage.getItem("userId");

  const addToWatchlist = async (movieId, watchlist) => {

    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
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
        watchlist: watchlist,
      }),
    };

    try {
      const response = await fetch(`${url}?session_id=${sessionId}`, options);
      const result = await response.json();
      console.log("Watchlist status updated:", result);

      
      if (watchlist) {
        dispatch(addWatchlist({ movieId }));
      } else {
        dispatch(removeWatchlist({ movieId }));
      }
    } catch (error) {
      toast.error("Gagal menambahkan ke daftar watchlist.", error);
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        dispatch(startFetching());
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
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
        toast.error("Gagal memuat daftar Watchlist.", err);
      }
    };

    fetchWatchlist();
  }, [dispatch, sessionId, accountId]);

  return (
    <WatchlistView
      watchlist={watchlist}
      watchlistStatus={watchlistStatus}
      loading={loading}
      error={error}
      onToggleWatchlist={(movieId, watchlist) => addToWatchlist(movieId, watchlist)}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default WatchList;