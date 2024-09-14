import React, { useState } from 'react';
import MovieForm from './MovieForm';
import MovieList from './MoviesListj';

function MoviesMain() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (movie) => {
        setSelectedMovie(movie);
    };

    const handleSuccess = () => {
        setSelectedMovie(null);
        setRefresh(!refresh);
    };

    return (
        <div className="container mx-auto p-4">
            <MovieForm movie={selectedMovie} onSuccess={handleSuccess} />
            <MovieList onEdit={handleEdit} />
        </div>
    );
}

export default MoviesMain;
