import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DetailView from "./DetailView";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setRating } from "../../store/Rating/RatingSlice"; 

const Detail = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const navigate = useNavigate();
  const rating = useSelector((state) => state.rating.rating); 
  const {isAuthenticated} = useSelector(state => state.login)

  // Ambil sessionId dan accountId dari localStorage
  const sessionId = localStorage.getItem("sessionToken");
  const accountId = localStorage.getItem("userId");

  // Fetch detail film
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      };

      try {
        const response = await axios.request(options);
        dispatch({ type: "data/fetchSuccess", payload: response.data });
      } catch (error) {
        dispatch({ type: "data/fetchError", payload: error.message });
      }
    };

    fetchMovieDetails();
    checkFavoriteStatus();
    checkWatchlistStatus();
    fetchUserRating(); // Ambil rating dari TMDB saat komponen dimuat
  }, [dispatch, id]);

  // Ambil rating dari TMDB
  const fetchUserRating = async () => {
    if (!sessionId) return;
  
    const url = `https://api.themoviedb.org/3/movie/${id}/account_states`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
      params: {
        session_id: sessionId, 
      },
    };
  
    try {
      const response = await axios(url, options); 
        dispatch(setRating(response.data.rated.value)); 
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  // Tambah rating
  const addRating = async (movieId, rating) => {
    if (!sessionId) {
      toast.error("Login Terlebih dahulu");
      return;
    }
  
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
      params: {
        session_id: sessionId, 
      },
      data: { value: rating }, 
    };
  
    try {
      await axios(url, options); 
      dispatch(setRating(rating)); 
      toast.success("Rating berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding rating:", error);
      toast.error("Gagal menambahkan rating.");
    }
  };

  // Tambah dan hapus dari favorit
  const addToFavorites = async (movieId, favorite) => {
    if (!sessionId || !accountId) {
      navigate("/login");
      return;
    }

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
      setIsFavorite(favorite);
    } catch (error) {
      toast.error("Gagal menambahkan ke daftar favorit.", error);
    }
  };

  // Cek status favorit
  const checkFavoriteStatus = async () => {
    if (!sessionId || !accountId) return;

    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    };

    try {
      const response = await fetch(`${url}?session_id=${sessionId}`, options);
      const result = await response.json();
      const isFavorite = result.results.some((movie) => movie.id === parseInt(id));
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  // Tambah dan hapus dari Watchlist
  const addToWatchlist = async (movieId, watchlist) => {
    if (!sessionId || !accountId) {
      navigate("/login");
      return;
    }

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
      setIsWatchlisted(watchlist);
    } catch (error) {
      toast.error("Gagal menambahkan ke daftar Watchlist.", error);
    }
  };

  // Cek status Watchlist
  const checkWatchlistStatus = async () => {
    if (!sessionId || !accountId) return;

    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    };

    try {
      const response = await fetch(`${url}?session_id=${sessionId}`, options);
      const result = await response.json();
      const isWatchlisted = result.results.some((movie) => movie.id === parseInt(id));
      setIsWatchlisted(isWatchlisted);
    } catch (error) {
      console.error("Error checking Watchlist status:", error);
    }
  };

  return (
    <div>
      <DetailView
        data={data}
        loading={loading}
        error={error}
        rating={rating}
        onRate={(newRating) => addRating(id, newRating)}
        isFavorite={isFavorite}
        onToggleFavorite={() => addToFavorites(id, !isFavorite)}
        isWatchlisted={isWatchlisted}
        onToggleWatchlisted={() => addToWatchlist(id, !isWatchlisted)}
        isAuthenticated = {isAuthenticated}
      />
    </div>
  );
};

export default Detail;