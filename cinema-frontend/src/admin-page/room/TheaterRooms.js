import { useEffect, useState } from 'react';

export default function TheaterRooms() {
    const [theaterRooms, setTheaterRooms] = useState([]);
    const [newTheaterRoom, setNewTheaterRoom] = useState({ idRoom: '', maxAmount: '' });
    const [editingRoom, setEditingRoom] = useState(null);
    const [editedTheaterRoom, setEditedTheaterRoom] = useState({ idRoom: '', maxAmount: '' });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:8080/api/theater-rooms')
            .then(response => response.json())
            .then(data => {
                setTheaterRooms(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching theater rooms:', error);
                setError('Error fetching theater rooms');
                setLoading(false);
            });
    }, []);

    const handleAddTheaterRoom = () => {
        fetch('http://localhost:8080/api/theater-rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTheaterRoom),
        })
            .then(response => response.json())
            .then(data => {
                setTheaterRooms([...theaterRooms, data]);
                setNewTheaterRoom({ idRoom: '', maxAmount: '' });
            })
            .catch(error => setError('Error adding theater room'));
    };

    const handleEditTheaterRoom = (id) => {
        fetch(`http://localhost:8080/api/theater-rooms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTheaterRoom),
        })
            .then(response => response.json())
            .then(data => {
                setTheaterRooms(theaterRooms.map(room => room.id === id ? data : room));
                setEditingRoom(null);
                setEditedTheaterRoom({ idRoom: '', maxAmount: '' });
            })
            .catch(error => setError('Error editing theater room'));
    };

    const handleDeleteTheaterRoom = (id) => {
        fetch(`http://localhost:8080/api/theater-rooms/${id}`, {
            method: 'DELETE',
        })
            .then(() => setTheaterRooms(theaterRooms.filter(room => room.id !== id)))
            .catch(error => setError('Error deleting theater room'));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestión de Salas</h1>

            {/* Formulario para agregar sala */}
            <div className="mb-4">
                <input
                    type="text"
                    value={newTheaterRoom.idRoom}
                    onChange={(e) => setNewTheaterRoom({ ...newTheaterRoom, idRoom: e.target.value })}
                    placeholder="ID de Sala"
                />
                <input
                    type="number"
                    value={newTheaterRoom.maxAmount}
                    onChange={(e) => setNewTheaterRoom({ ...newTheaterRoom, maxAmount: e.target.value })}
                    placeholder="Capacidad Máxima"
                />
                <button onClick={handleAddTheaterRoom} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Agregar Sala
                </button>
            </div>

            <ul>
                {theaterRooms.map(room => (
                    <li key={room.id} className="flex items-center mb-2">
                        {editingRoom === room.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTheaterRoom.idRoom}
                                    onChange={(e) => setEditedTheaterRoom({ ...editedTheaterRoom, idRoom: e.target.value })}
                                    placeholder="ID de Sala"
                                />
                                <input
                                    type="number"
                                    value={editedTheaterRoom.maxAmount}
                                    onChange={(e) => setEditedTheaterRoom({ ...editedTheaterRoom, maxAmount: e.target.value })}
                                    placeholder="Capacidad Máxima"
                                />
                                <button onClick={() => handleEditTheaterRoom(room.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                ID de Sala: {room.idRoom} - Capacidad Máxima: {room.maxAmount}
                                <button onClick={() => setEditingRoom(room.id)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteTheaterRoom(room.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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
