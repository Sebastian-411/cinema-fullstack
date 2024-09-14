import { useEffect, useState } from 'react';

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [screeningSchedules, setScreeningSchedules] = useState([]);
    const [newReservation, setNewReservation] = useState({ amountTickets: '', customerId: '', screeningScheduleId: '' });
    const [editingReservation, setEditingReservation] = useState(null);
    const [editedReservation, setEditedReservation] = useState({ amountTickets: '', customerId: '', screeningScheduleId: '' });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/reservations/private-collaborator')
            .then(response => response.json())
            .then(data => {
                setReservations(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
                setError('Error fetching reservations');
                setLoading(false);
            });

        fetch('http://localhost:8080/api/customers/private')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => {
                console.error('Error fetching customers:', error);
                setError('Error fetching customers');
            });

        fetch('http://localhost:8080/api/screening-schedules')
            .then(response => response.json())
            .then(data => setScreeningSchedules(data))
            .catch(error => {
                console.error('Error fetching screening schedules:', error);
                setError('Error fetching screening schedules');
            });
    }, []);

    const handleAddReservation = () => {
        fetch('http://localhost:8080/api/reservations/private-collaborator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amountTicketsReserved: newReservation.amountTickets,
                customer: { id: newReservation.customerId },
                screeningSchedule: { id: newReservation.screeningScheduleId }
            }),
        })
            .then(() => {
                setNewReservation({ amountTickets: '', customerId: '', screeningScheduleId: '' });
                return fetch('http://localhost:8080/api/reservations/private-collaborator');
            })
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => setError('Error adding reservation'));
    };

    const handleEditReservation = (id) => {
        fetch(`http://localhost:8080/api/reservations/private/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amountTicketsReserved: editedReservation.amountTickets,
                customer: { id: editedReservation.customerId },
                screeningSchedule: { id: editedReservation.screeningScheduleId }
            }),
        })
            .then(() => {
                setEditingReservation(null);
                setEditedReservation({ amountTickets: '', customerId: '', screeningScheduleId: '' });
                return fetch('http://localhost:8080/api/reservations/private-collaborator');
            })
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => setError('Error editing reservation'));
    };

    const handleDeleteReservation = (id) => {
        fetch(`http://localhost:8080/api/reservations/private/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetch('http://localhost:8080/api/reservations/private-collaborator'))
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => setError('Error deleting reservation'));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    function formatDate(dateInit) {
        const date = new Date(dateInit);
        const month = date.toLocaleDateString('es-ES', { month: 'long' });
        const day = date.toLocaleDateString('es-ES', { day: 'numeric' });
        const hour = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return `${month}-${day}-${hour}`;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Reservas</h1>
            
            {/* Formulario para agregar reserva */}
            <div className="mb-4">
                <input
                    type="number"
                    value={newReservation.amountTickets}
                    onChange={(e) => setNewReservation({ ...newReservation, amountTickets: e.target.value })}
                    placeholder="Cantidad de tickets"
                />
                
                <select
                    value={newReservation.customerId}
                    onChange={(e) => setNewReservation({ ...newReservation, customerId: e.target.value })}
                >
                    <option value="">Seleccionar cliente</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.username}</option>
                    ))}
                </select>

                <select
                    value={newReservation.screeningScheduleId}
                    onChange={(e) => setNewReservation({ ...newReservation, screeningScheduleId: e.target.value })}
                >
                    <option value="">Seleccionar horario</option>
                    {screeningSchedules.map(schedule => (
                        <option key={schedule.id} value={schedule.id}>
                            {schedule.movie.title} - {formatDate(schedule.dateInit)}
                        </option>
                    ))}
                </select>

                <button onClick={handleAddReservation} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </div>

            <ul>
                {Array.isArray(reservations) && reservations.map(reservation => (
                    <li key={reservation.id} className="flex items-center mb-2">
                        {editingReservation === reservation.id ? (
                            <>
                                <input
                                    type="number"
                                    value={editedReservation.amountTickets}
                                    onChange={(e) => setEditedReservation({ ...editedReservation, amountTickets: e.target.value })}
                                />

                                <select
                                    value={editedReservation.customerId}
                                    onChange={(e) => setEditedReservation({ ...editedReservation, customerId: e.target.value })}
                                >
                                    <option value="">Seleccionar cliente</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>{customer.username}</option>
                                    ))}
                                </select>

                                <select
                                    value={editedReservation.screeningScheduleId}
                                    onChange={(e) => setEditedReservation({ ...editedReservation, screeningScheduleId: e.target.value })}
                                >
                                    <option value="">Seleccionar horario</option>
                                    {screeningSchedules.map(schedule => (
                                        <option key={schedule.id} value={schedule.id}>
                                            {schedule.movie.title} - {formatDate(schedule.dateInit)}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={() => handleEditReservation(reservation.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                Cantidad de tickets - {reservation.amountTicketsReserved} - cliente: - {reservation.customer.username} - Sala - {reservation.screeningSchedule.room.idRoom} - Película - {reservation.screeningSchedule.movie.title} - Fecha - {formatDate(reservation.screeningSchedule.dateInit)}

                                <button onClick={() => setEditingReservation(reservation.id)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteReservation(reservation.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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
    