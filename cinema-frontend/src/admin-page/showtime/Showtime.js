import { useEffect, useState } from 'react';

export default function Showtimes() {
    const [showtimes, setShowtimes] = useState([]);
    const [newShowtime, setNewShowtime] = useState('');
    const [editingShowtime, setEditingShowtime] = useState(null);
    const [editedShowtime, setEditedShowtime] = useState('');
    
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/screening-schedules')
            .then(response => response.json())
            .then(data => setShowtimes(data));

        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data));

        fetch('http://localhost:8080/api/theater-rooms')
            .then(response => response.json())
            .then(data => setRooms(data));
    }, []);

    const handleAddShowtime = () => {
        fetch('http://localhost:8080/api/screening-schedules/private-collaborator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                dateInit: newShowtime,
                movie: { id: selectedMovie },
                room: { id: selectedRoom }
            }),
        })
            .then(() => {
                setNewShowtime('');
                setSelectedMovie('');
                setSelectedRoom('');
                return fetch('http://localhost:8080/api/screening-schedules');
            })
            .then(response => response.json())
            .then(data => setShowtimes(data));
    };

    const handleEditShowtime = (id) => {
        fetch(`http://localhost:8080/api/screening-schedules/private-collaborator/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                dateInit: editedShowtime,
                movie: { id: selectedMovie },
                room: { id: selectedRoom }
            }),
        })
            .then(() => {
                setEditingShowtime(null);
                setEditedShowtime('');
                setSelectedMovie('');
                setSelectedRoom('');
                return fetch('http://localhost:8080/api/screening-schedules');
            })
            .then(response => response.json())
            .then(data => setShowtimes(data));
    };

    const handleDeleteShowtime = (id) => {
        fetch(`http://localhost:8080/api/screening-schedules/private-collaborator/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetch('http://localhost:8080/api/screening-schedules'))
            .then(response => response.json())
            .then(data => setShowtimes(data));
    };

    function formatDate(dateInit) {
        const date = new Date(dateInit);
        const month = date.toLocaleDateString('es-ES', { month: 'long' });
        const day = date.toLocaleDateString('es-ES', { day: 'numeric' });
        const hour = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return `${month}-${day}-${hour}`;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Funciones</h1>
            <input
                type="datetime-local"
                value={newShowtime}
                onChange={(e) => setNewShowtime(e.target.value)}
                placeholder="Nueva función"
            />
            <select
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                className="ml-2"
            >
                <option value="">Seleccionar película</option>
                {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
            </select>
            <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="ml-2"
            >
                <option value="">Seleccionar sala</option>
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.idRoom}</option>
                ))}
            </select>
            <button onClick={handleAddShowtime} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                Agregar
            </button>

            <ul>
                {Array.isArray(showtimes) && showtimes.map(showtime => (
                    <li key={showtime.id} className="flex items-center mb-2">
                        {editingShowtime === showtime.id ? (
                            <>
                                <input
                                    type="datetime-local"
                                    value={editedShowtime}
                                    onChange={(e) => setEditedShowtime(e.target.value)}
                                />
                                <select
                                    value={selectedMovie}
                                    onChange={(e) => setSelectedMovie(e.target.value)}
                                    className="ml-2"
                                >
                                    <option value="">Seleccionar película</option>
                                    {movies.map(movie => (
                                        <option key={movie.id} value={movie.id}>{movie.title}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedRoom}
                                    onChange={(e) => setSelectedRoom(e.target.value)}
                                    className="ml-2"
                                >
                                    <option value="">Seleccionar sala</option>
                                    {rooms.map(room => (
                                        <option key={room.idRoom} value={room.idRoom}>{room.idRoom}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleEditShowtime(showtime.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                {showtime.movie.title} - Room: {showtime.room.idRoom} - Fecha: {formatDate(showtime.dateInit)}
                                <button onClick={() => setEditingShowtime(showtime.id)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteShowtime(showtime.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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
