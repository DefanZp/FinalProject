import React, { useState, useEffect, useCallback } from 'react'
import SearchView from './SearchView'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../../store/Data/DataSlice';
import axios from 'axios';

const Search = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");
    const [inputValue, setInputValue]= useState(searchQuery);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.data);
    const [filterOption, setFilterOption] = useState('Terpopuler');

    const getFilteredData = (movies, filterOption) => {

        switch (filterOption) {

          case 'Terpopuler':
            return [...movies].sort((a, b) => b.popularity - a.popularity);

          case 'Terbaru':
            return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))

          case 'Acak': 
          return [...movies].sort(() => Math.random() - 0.5); 

          default:
            return movies;
        }
      };
      
      const filteredData = getFilteredData(data.results || [], filterOption);
    
    
      const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
      };

      useEffect(() => {
        const fetchSearch = async () => {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}`,
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          };
      
          try {
            const response = await axios.request(options);
            dispatch(dataActions.fetchSuccess(response.data));
          } catch (error) {
            dispatch(dataActions.fetchError(error.message));
          }
        };
      
        fetchSearch();
      }, [dispatch, searchQuery, currentPage]); 

      const handleSearch = useCallback(() => {
        setSearchParams({ query: inputValue });
      }, [inputValue, setSearchParams]);


  return (
    <div>
      <SearchView 
      data= {data}
      loading={loading}
      error={error}
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleSearch={handleSearch}
      filteredData ={filteredData}
      handleFilterChange={handleFilterChange}
      filterOption={filterOption} 
      setCurrentPage = {setCurrentPage} 
      currentPage = {currentPage}
      />
    </div>
  )
}

export default Search
