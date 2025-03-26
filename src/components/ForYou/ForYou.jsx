import { useEffect } from 'react'
import ForYouView from './ForYouView'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuccess, fetchIdSuccess } from '../../store/ForYou/ForYouSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForYou = () => {

  const sessionId = localStorage.getItem('sessionToken')
  const accountId = localStorage.getItem('userId')
  const dispatch = useDispatch()
  const {favorite} = useSelector(state => state.favorite)
  const {data, movieId} = useSelector(state => state.forYou)

  useEffect(() => {

    const fetchFavorite = async () => {
        try {


          if (!accountId || !sessionId) {
            
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
                }
              }
            )

            dispatch(fetchSuccess(response.data.results));
            return;
          }
          const response = await axios.get(
            `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
              },

              params: {
                session_id: sessionId,
              }
            }
          );
          
         
          const movieId = response.data.results.map((movie) => movie.id);
          dispatch(fetchIdSuccess(movieId));
        

          movieId.forEach(async (id) => {
            try {
              const recommendationResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
                {
                  headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
                  },
                }
              );
    
              dispatch(fetchSuccess(recommendationResponse.data.results));
            } catch (error) {
              toast.error("Gagal memuat rekomendasi.", error);
            }
          });
        } catch (error) {
          toast.error("Gagal memuat daftar Favorit.", error);
        }
    }

    

    
    fetchFavorite();
  }, [accountId, sessionId, dispatch]);  
    
  return (
    <div>
      <ForYouView 
      favorite = {favorite}
      data = {data}
      />
    </div>
  )
}

export default ForYou
