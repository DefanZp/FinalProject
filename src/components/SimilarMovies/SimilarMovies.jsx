import React, { useEffect } from 'react';
import SimilarMoviesView from './SimilarMoviesView';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchSuccess,fetchCollectionId } from "../../store/SimilarMovies/SimilarMoviesSlice";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const SimilarMovies = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: combinedRelatedMovies, loading, error, collectionId } = useSelector((state) => state.similarMovies);

  const fetchMovies = async () => {

    try {

      try {
        const detailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }  
      );
        dispatch(fetchCollectionId(detailsResponse.data?.belongs_to_collection?.id))
      } catch (error) {
        toast.error("Gagal memuat collectionId."),error;
      }

      
      const moviePromise = [
        axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, 
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }  
      )
      ];

      if (collectionId) {
        moviePromise.push(
          axios.get(
          `https://api.themoviedb.org/3/collection/${collectionId}?language=en-US`, 
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }  
        )
        );
      }

      // menyimpan ke array results
      const results = await Promise.all(moviePromise);

      const similarResponse = results[0]; 
      const similarMovies = similarResponse?.data?.results ;
      console.log(similarMovies);

      let collectionMovies = [];

      if (collectionId && results.length > 0) {
        const collectionResponse = results[1]; 
        collectionMovies = collectionResponse?.data?.parts || [];
      }
      console.log(collectionMovies);
      // Gabung Array
      const combinedMovies = [...collectionMovies, ...similarMovies];
      console.log(combinedMovies);
        dispatch(fetchSuccess(combinedMovies));
      

    } catch (error) {
      toast.error("Gagal mengambil data related movies:", error);
    }
  };
  
  useEffect(() => {


    

    fetchMovies();



  }, [dispatch, id, collectionId]);

  return (
    <div>
      <SimilarMoviesView
       data={combinedRelatedMovies}
       loading={loading}
       error={error}
      />
    </div>
  );
};

export default SimilarMovies;