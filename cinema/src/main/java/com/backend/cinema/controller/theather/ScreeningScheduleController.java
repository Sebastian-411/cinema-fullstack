package com.backend.cinema.controller.theather;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.controller.movie.MovieController;
import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.service.theater.ScreeningScheduleService;

import java.util.List;

@RestController
@RequestMapping("/api/screening-schedules")
public class ScreeningScheduleController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private ScreeningScheduleService screeningScheduleService;

    @GetMapping
    public ResponseEntity<List<ScreeningSchedule>> getAllScreeningSchedules() {
        return ResponseEntity.ok(screeningScheduleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScreeningSchedule> getScreeningScheduleById(@PathVariable Long id) {
        return screeningScheduleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/private-collaborator")
    public ResponseEntity<String> createScreeningSchedule(@RequestBody ScreeningSchedule screeningSchedule) {
        try {
            logger.info("1");

            if (screeningSchedule.getMovie() == null || screeningSchedule.getMovie().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Movie is required.");
            }

            if (screeningSchedule.getRoom() == null || screeningSchedule.getRoom().getId() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("TheaterRoom is required.");
            }

            logger.info("2");

            ScreeningSchedule createdSchedule = screeningScheduleService.save(screeningSchedule);

            
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule.getId().toString());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/private-collaborator/{id}")
    public ResponseEntity<ScreeningSchedule> updateScreeningSchedule(@PathVariable Long id,
            @RequestBody ScreeningSchedule screeningScheduleDetails) {
        return screeningScheduleService.findById(id)
                .map(screeningSchedule -> {
                    screeningSchedule.setDateInit(screeningScheduleDetails.getDateInit());
                    screeningSchedule.setMovie(screeningScheduleDetails.getMovie());
                    screeningSchedule.setRoom(screeningScheduleDetails.getRoom());
                    return ResponseEntity.ok(screeningScheduleService.save(screeningSchedule));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/private-collaborator/{id}")
    public ResponseEntity<Void> deleteScreeningSchedule(@PathVariable Long id) {
        if (screeningScheduleService.findById(id).isPresent()) {
            screeningScheduleService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
