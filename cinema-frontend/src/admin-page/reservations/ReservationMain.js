import React, { useState } from 'react';
import ReservationForm from './ReservationForm';
import ReservationList from './ReservationList';

function ReservationMain() {
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleEdit = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleSuccess = () => {
        setSelectedReservation(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Cinema Reservation System</h1>
            
            <div className="mb-6">
                {selectedReservation ? (
                    <ReservationForm reservation={selectedReservation} onSuccess={handleSuccess} />
                ) : (
                    <ReservationForm reservation={null} onSuccess={handleSuccess} />
                )}
            </div>

            <ReservationList onEdit={handleEdit} />
        </div>
    );
}

export default ReservationMain;
