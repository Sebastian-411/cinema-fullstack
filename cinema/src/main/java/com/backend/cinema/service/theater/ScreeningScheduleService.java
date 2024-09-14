package com.backend.cinema.service.theater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.repository.theater.ScreeningScheduleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ScreeningScheduleService {

    @Autowired
    private ScreeningScheduleRepository screeningScheduleRepository;

    public List<ScreeningSchedule> findAll() {
        return screeningScheduleRepository.findAll();
    }

    public Optional<ScreeningSchedule> findById(Long id) {
        return screeningScheduleRepository.findById(id);
    }

    public ScreeningSchedule save(ScreeningSchedule screeningSchedule) {
        return screeningScheduleRepository.save(screeningSchedule);
    }

    public void deleteById(Long id) {
        screeningScheduleRepository.deleteById(id);
    }
}
