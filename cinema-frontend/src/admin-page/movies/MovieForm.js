import React, { useState } from 'react';
import axios from 'axios';

function MovieForm({ movie, onSuccess }) {
    const [title, setTitle] = useState(movie ? movie.title : '');
    const [director, setDirector] = useState(movie ? movie.director : '');
    const [duration, setDuration] = useState(movie ? movie.duration : '');
    const [releaseDate, setReleaseDate] = useState(movie ? movie.releaseDate : '');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('director', director);
        formData.append('duration', duration);
        formData.append('releaseDate', releaseDate);
        
        if (image) {
            formData.append('file', image);
        }

        try {
            const url = movie
                ? `http://localhost:8080/api/movies/private-collaborator/${movie.id}`
                : 'http://localhost:8080/api/movies/private-collaborator';
            
            const method = movie ? 'put' : 'post';
            
            await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSuccess();
        } catch (error) {
            setError("There was an error! Please try again.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
            <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Director</label>
                <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Duration (min)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Release Date</label>
                <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Submitting...' : (movie ? 'Update Movie' : 'Add Movie')}
            </button>
        </form>
    );
}

export default MovieForm;
