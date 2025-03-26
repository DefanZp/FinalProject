import React from 'react'
import SimilarMoviesView from './SimilarMoviesView'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchSuccess} from "../../store/SimilarMovies/SimilarMoviesSlice"
import { fetchSuccess as fetchCollectionSuccess, fetchIdSuccess } from '../../store/CollectionMovies/CollectionMoviesSlice'
import { Link, useParams } from 'react-router-dom'

const SimilarMovies = () => {

const dispatch = useDispatch();
const {id} = useParams();
const {data, loading, error} = useSelector((state) => state.similarMovies);
const {data: collection,movieId } = useSelector((state) => state.collectionMovies);



useEffect(() => {

    const fetchMovieDetails = async () => {
        try {
          
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          });
    
      
            dispatch(fetchIdSuccess(response.data?.belongs_to_collection?.id))
          
        } catch (error) {
          dispatch({ type: "collectionMovies/fetchError", payload: error.message });
        }
    
      
      };

    
      
    const fetchSimilarMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
                {
                    headers: {
                      accept: "application/json",
                      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
                    },

                }
            );

            dispatch(fetchSuccess(response.data.results));
        } catch (error) {
            console.log(error);
        }
    }

    fetchMovieDetails();
    fetchSimilarMovies();
} , [dispatch, id, movieId])


useEffect(() => {

  const fetchCollectionMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/collection/${movieId}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
  
      dispatch(fetchCollectionSuccess(response.data.parts));
    } catch (error) {
      console.log(error);
    }
  };

  if (movieId) {
    fetchCollectionMovies();
  }

}, [dispatch,movieId]);

  return (
    <div>
      <SimilarMoviesView 
       data={data}
       loading={loading}
       error={error}
       collection={collection}
      />
    </div>
  )
}

export default SimilarMovies
