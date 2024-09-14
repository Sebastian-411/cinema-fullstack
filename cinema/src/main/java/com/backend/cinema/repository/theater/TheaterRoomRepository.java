package com.backend.cinema.repository.theater;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.theater.TheaterRoom;

public interface TheaterRoomRepository extends JpaRepository<TheaterRoom, Long> {
}
