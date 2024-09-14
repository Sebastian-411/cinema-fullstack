import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import Hero from './components/Hero';
import CinemaList from './components/CinemaList';
import CinemaFunctions from './components/CinemaFunctions';

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:8080/api/movies/screening-schedules')
      .then(response => {
        setFunctions(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  }, []);



  return (
    <>
      <div>
        <p>main page</p>
        <Hero />
      </div>

      <div>
        <CinemaFunctions  movies={functions} />
      </div>      

      <div>
        <CinemaList movies={movies} />
      </div>
    </>
  );
}

export default MainPage;
