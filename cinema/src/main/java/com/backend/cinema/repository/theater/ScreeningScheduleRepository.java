package com.backend.cinema.repository.theater;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.theater.ScreeningSchedule;

public interface ScreeningScheduleRepository extends JpaRepository<ScreeningSchedule, Long> {
}
