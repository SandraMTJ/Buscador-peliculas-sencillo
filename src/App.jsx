import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`http://www.omdbapi.com/?apikey=2bfc53c8&s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Search) {
            setMovies(data.Search);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [searchTerm]);

  return (
    <>
    <div className="App">
      <h1>Buscador de Películas</h1>
      <input
        type="text"
        placeholder="Buscar película"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <div className="movie-details">
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    
      </>
  );
}

export default App;
