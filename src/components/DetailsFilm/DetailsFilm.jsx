import React, { useEffect, useRef } from "react";
import DetailsFilmView from "./DetailsFilmView";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess as fetchVideoSuccess, fetchError as fetchVideoError } from "../../store/Video/VideoSlice";
import { fetchSuccess as fetchCreditSuccess, fetchError as fetchCreditError } from "../../store/Credit/CreditSlice";
import { useParams } from "react-router-dom";
import "@splidejs/react-splide/css";


const DetailsFilm = () => {
  const dispatch = useDispatch();
  const { data: creditData, loading: creditLoading } = useSelector((state) => state.credit);
  const { data: videoData, loading: videoLoading, } = useSelector((state) => state.video);
  const { id } = useParams();
  const splideRef = useRef(null);

  

useEffect(() => {
    if (splideRef.current && creditData.cast) {
      const splideInstance = splideRef.current.splide;

      splideInstance.on('pagination:mounted', function (data) {
       
        data.list.classList.add('splide__pagination--custom');

        
        data.items.forEach(function (item) {
          item.button.textContent = String(item.page + 1);
        });
      });

      splideInstance.refresh();
    }
  }, [creditData]);
  
  useEffect(() => {
  
    const fetchCredit = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}}/credits?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(fetchCreditSuccess(response.data));
      } catch (error) {
        dispatch(fetchCreditError(error.message));
      }
    };

    
    const fetchVideo = async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(fetchVideoSuccess(response.data.results)); 
      } catch (error) {
        dispatch(fetchVideoError(error.message));
      }
    };

    fetchCredit();
    fetchVideo();
  }, [dispatch, id]);

  return (
    <div>
     
      <DetailsFilmView
        creditData={creditData}
        creditLoading={creditLoading}
        videoData={videoData}
        videoLoading={videoLoading}
        splideRef={splideRef}
      />
    </div>
  );
};

export default DetailsFilm;