package com.backend.cinema.controller.theather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.service.theater.ScreeningScheduleService;

import java.util.List;

@RestController
@RequestMapping("/api/screening-schedules")
public class ScreeningScheduleController {

    @Autowired
    private ScreeningScheduleService screeningScheduleService;

    @GetMapping
    public List<ScreeningSchedule> getAllScreeningSchedules() {
        return screeningScheduleService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScreeningSchedule> getScreeningScheduleById(@PathVariable Long id) {
        return screeningScheduleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/private-collaborator")
    public ScreeningSchedule createScreeningSchedule(@RequestBody ScreeningSchedule screeningSchedule) {
        return screeningScheduleService.save(screeningSchedule);
    }
    
    @PutMapping("/private-collaborator/{id}")
    public ResponseEntity<ScreeningSchedule> updateScreeningSchedule(@PathVariable Long id, @RequestBody ScreeningSchedule screeningScheduleDetails) {
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
    public ResponseEntity<Object> deleteScreeningSchedule(@PathVariable Long id) {
        return screeningScheduleService.findById(id)
                .map(screeningSchedule -> {
                    screeningScheduleService.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    }
