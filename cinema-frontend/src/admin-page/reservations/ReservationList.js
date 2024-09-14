import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReservationList({ onEdit }) {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchReservations() {
            const response = await axios.get('http://localhost:8080/api/reservations/private-collaborator');
            setReservations(response.data);
        }
        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
            try {
                await axios.delete(`http://localhost:8080/api/reservations/private-collaborator/${id}`);
                setReservations(reservations.filter(reservation => reservation.id !== id));
                toast.success('Reserva eliminada con éxito.');
            } catch (error) {
                console.error("Error", error);
                toast.error('Hubo un problema al eliminar la reserva. Inténtalo nuevamente.');
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reservation List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reservations.map(reservation => (
                    <div key={reservation.id} className="border rounded-lg p-4 shadow-lg">
                        <h3 className="text-xl font-bold">Reservation ID: {reservation.id}</h3>
                        <p className="text-gray-600">Customer: {reservation.customer.username}</p>
                        <p className="text-gray-600">Amount Tickets Reserved: {reservation.amountTicketsReserved}</p>
                        <p className="text-gray-600">Screening Schedule: {reservation.screeningSchedule.id}</p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => onEdit(reservation)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(reservation.id)}
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

export default ReservationList;
