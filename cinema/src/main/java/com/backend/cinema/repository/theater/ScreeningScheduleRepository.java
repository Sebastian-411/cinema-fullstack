package com.backend.cinema.repository.theater;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.model.theater.TheaterRoom;

public interface ScreeningScheduleRepository extends JpaRepository<ScreeningSchedule, Long> {

        List<ScreeningSchedule> findByRoomAndDateInitAndIdNot(TheaterRoom room, LocalDateTime dateInit, Long id);
}
