import React, { useState, useEffect } from 'react'
import axios from '../../axios';
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

// const base_url ="https://image.tmbd.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg";

const base_url = "https://image.tmdb.org/t/p/w500/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results)
      setMovies(request.data.results)
      return request;
    }
    fetchData()
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    trailerUrl ? setTrailerUrl('') : movieTrailer(movie?.name || "").then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get('v'))
    }).catch((error) => console.log(error));
  }



  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className="row__movies">
        {movies?.map((movie) => (
          <img key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__movie ${isLargeRow && 'row__movieLarge'}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
};




export default Row