package com.backend.cinema.service.theater;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.cinema.controller.movie.MovieController;
import com.backend.cinema.model.movie.Movie;
import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.model.theater.TheaterRoom;
import com.backend.cinema.repository.movie.MovieRepository;
import com.backend.cinema.repository.theater.ScreeningScheduleRepository;
import com.backend.cinema.repository.theater.TheaterRoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ScreeningScheduleService {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private ScreeningScheduleRepository screeningScheduleRepository;

    @Autowired
    private TheaterRoomRepository theaterRoomRepository;

    @Autowired
    private MovieRepository movieRepository;

    public List<ScreeningSchedule> findAll() {
        return screeningScheduleRepository.findAll();
    }

    public Optional<ScreeningSchedule> findById(Long id) {
        return screeningScheduleRepository.findById(id);
    }

    public ScreeningSchedule save(ScreeningSchedule screeningSchedule) {
        logger.info("3");
        if (screeningSchedule.getMovie() != null) {
            Movie movie = movieRepository.findById(screeningSchedule.getMovie().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
            screeningSchedule.setMovie(movie);
        }

        logger.info("4");
        if (screeningSchedule.getRoom() != null) {
            TheaterRoom room = theaterRoomRepository.findById(screeningSchedule.getRoom().getId())
                    .orElseThrow(() -> new IllegalArgumentException("TheaterRoom not found"));
            screeningSchedule.setRoom(room);
        }
    
        List<ScreeningSchedule> overlappingSchedules = screeningScheduleRepository.findByRoomAndDateInitAndIdNot(
                screeningSchedule.getRoom(), 
                screeningSchedule.getDateInit(),
                screeningSchedule.getId()
        );
        logger.info("5");

        if (!overlappingSchedules.isEmpty()) {
            throw new IllegalArgumentException("Ya existe una proyección en esta sala y fecha.");
        }

        return screeningScheduleRepository.save(screeningSchedule);
    }

    public void deleteById(Long id) {
        screeningScheduleRepository.deleteById(id);
    }
}
