import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:8080/api/movies');
                setMovies(response.data);
            } catch (error) {
                setError("There was an error fetching the movies.");
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/movies/private-collaborator/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (error) {
            setError("There was an error deleting the movie.");
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Movie List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <div key={movie.id} className="border rounded-lg p-4 shadow-lg bg-white">
                        {movie.imageUrl ? (
                            <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md mb-2" />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                                <p className="text-gray-500">No Image Available</p>
                            </div>
                        )}
                        <h3 className="text-xl font-bold">{movie.title}</h3>
                        <p className="text-gray-600">Director: {movie.director}</p>
                        <p className="text-gray-600">Duration: {movie.duration} min</p>
                        <p className="text-gray-600">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleDelete(movie.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
