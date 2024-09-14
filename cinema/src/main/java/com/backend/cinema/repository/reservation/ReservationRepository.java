package com.backend.cinema.repository.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.reservation.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
