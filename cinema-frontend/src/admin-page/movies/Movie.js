import { useEffect, useState } from 'react';

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', director: '', duration: '', releaseDate: '', imageFile: null });
    const [editingMovie, setEditingMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState({ title: '', director: '', duration: '', releaseDate: '' });

    useEffect(() => {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    const handleAddMovie = () => {
        const formData = new FormData();
        formData.append('title', newMovie.title);
        formData.append('director', newMovie.director);
        formData.append('duration', newMovie.duration);
        formData.append('releaseDate', newMovie.releaseDate);
        if (newMovie.imageFile) {
            formData.append('file', newMovie.imageFile);
        }

        fetch('http://localhost:8080/api/movies/private-collaborator', {
            method: 'POST',
            body: formData,
        })
            .then(() => {
                setNewMovie({ title: '', director: '', duration: '', releaseDate: '', imageFile: null });
                return fetch('http://localhost:8080/api/movies');
            })
            .then(response => response.json())
            .then(data => setMovies(data));
    };

    const handleEditMovie = (id) => {
        fetch(`http://localhost:8080/api/movies/private-collaborator/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedMovie),
        })
            .then(() => {
                setEditingMovie(null);
                setEditedMovie({ title: '', director: '', duration: '', releaseDate: '' });
                return fetch('http://localhost:8080/api/movies');
            })
            .then(response => response.json())
            .then(data => setMovies(data));
    };

    const handleDeleteMovie = (id) => {
        fetch(`http://localhost:8080/api/movies/private-collaborator/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetch('http://localhost:8080/api/movies'))
            .then(response => response.json())
            .then(data => setMovies(data));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Películas</h1>
            <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                placeholder="Título"
            />
            <input
                type="text"
                value={newMovie.director}
                onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                placeholder="Director"
            />
            <input
                type="number"
                value={newMovie.duration}
                onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                placeholder="Duración (min)"
            />
            <input
                type="date"
                value={newMovie.releaseDate}
                onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
            />
            <input
                type="file"
                onChange={(e) => setNewMovie({ ...newMovie, imageFile: e.target.files[0] })}
            />
            <button onClick={handleAddMovie} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                Agregar
            </button>

            <ul>
                {movies.map(movie => (
                    <li key={movie.id} className="flex items-center mb-2">
                        {editingMovie === movie.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedMovie.title}
                                    onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedMovie.director}
                                    onChange={(e) => setEditedMovie({ ...editedMovie, director: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editedMovie.duration}
                                    onChange={(e) => setEditedMovie({ ...editedMovie, duration: e.target.value })}
                                />
                                <input
                                    type="date"
                                    value={editedMovie.releaseDate}
                                    onChange={(e) => setEditedMovie({ ...editedMovie, releaseDate: e.target.value })}
                                />
                                <button onClick={() => handleEditMovie(movie.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                                <button onClick={() => setEditingMovie(null)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{movie.title} - {movie.director} - {movie.duration} min - {movie.releaseDate}</span>
                                <button onClick={() => setEditingMovie(movie.id)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteMovie(movie.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                                    Eliminar
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
