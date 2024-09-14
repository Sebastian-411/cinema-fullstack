package com.backend.cinema.controller.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.model.reservation.Reservation;
import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.service.reservation.ReservationService;
import com.backend.cinema.service.theater.ScreeningScheduleService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ScreeningScheduleService screeningScheduleService;


    @GetMapping("/private-collaborator")
    public List<Reservation> getAllReservations() {
        return reservationService.findAll();
    }

    @GetMapping("/private/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/private-collaborator")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        try {
            ScreeningSchedule schedule = screeningScheduleService.findById(reservation.getScreeningSchedule().getId())
                    .orElseThrow(() -> new RuntimeException("Screening schedule not found"));
            if (reservation.getAmountTicketsReserved() > schedule.getAvailableTickets()) {
                return ResponseEntity.badRequest().build();
            }
            schedule.reduceTickets(reservation.getAmountTicketsReserved());
            screeningScheduleService.save(schedule);
            return ResponseEntity.ok(reservationService.save(reservation));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/private/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id,
            @RequestBody Reservation reservationDetails) {
        return reservationService.findById(id)
                .map(reservation -> {
                    reservation.setAmountTicketsReserved(reservationDetails.getAmountTicketsReserved());
                    reservation.setCustomer(reservationDetails.getCustomer());
                    reservation.setScreeningSchedule(reservationDetails.getScreeningSchedule());
                    return ResponseEntity.ok(reservationService.save(reservation));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
