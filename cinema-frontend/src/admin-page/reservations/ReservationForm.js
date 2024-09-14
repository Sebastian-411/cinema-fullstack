import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReservationForm({ reservation, onSuccess }) {
    const [amountTicketsReserved, setAmountTicketsReserved] = useState(reservation ? reservation.amountTicketsReserved : '');
    const [customerId, setCustomerId] = useState(reservation ? reservation.customer.id : '');
    const [screeningScheduleId, setScreeningScheduleId] = useState(reservation ? reservation.screeningSchedule.id : '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            amountTicketsReserved,
            customer: { id: customerId },
            screeningSchedule: { id: screeningScheduleId }
        };

        try {
            // Verifica disponibilidad antes de realizar la reserva
            const screeningResponse = await axios.get(`http://localhost:8080/api/screening-schedules/${screeningScheduleId}`);
            const screeningSchedule = screeningResponse.data;

            if (amountTicketsReserved > screeningSchedule.availableTickets) {
                toast.error('No hay suficientes tiquetes disponibles para esta sala.');
                return;
            }

            if (reservation) {
                // Actualiza reserva existente
                await axios.put(`http://localhost:8080/api/reservations/private/${reservation.id}`, reservationData);
            } else {
                // Crea nueva reserva
                await axios.post('http://localhost:8080/api/reservations/private-collaborator', reservationData);
            }

            toast.success('Reserva realizada con éxito.');
            onSuccess();
        } catch (error) {
            console.error("Error", error);
            toast.error('Hubo un problema con la reserva. Inténtalo nuevamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{reservation ? 'Edit Reservation' : 'Add New Reservation'}</h2>
            <div className="mb-4">
                <label className="block mb-2">Amount Tickets Reserved</label>
                <input
                    type="number"
                    value={amountTicketsReserved}
                    onChange={(e) => setAmountTicketsReserved(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Customer ID</label>
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Screening Schedule ID</label>
                <input
                    type="text"
                    value={screeningScheduleId}
                    onChange={(e) => setScreeningScheduleId(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {reservation ? 'Update Reservation' : 'Add Reservation'}
            </button>
        </form>
    );
}

export default ReservationForm;
