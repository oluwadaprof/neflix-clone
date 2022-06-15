import React, { useState, useEffect } from 'react'
import axios from '../../axios';
import './row.css'

// const base_url ="https://image.tmbd.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg";

const base_url = "https://image.tmdb.org/t/p/w500/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results)
      setMovies(request.data.results)
      return request;
    }
    fetchData()
  }, [fetchUrl]);

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className="row__movies">
        {movies?.map((movie) => (
          <img className={`row__movie ${isLargeRow && 'row__movieLarge'}`} key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}  alt={movie.name} />
        ))}
      </div>
    </div>
  )
}

export default Row