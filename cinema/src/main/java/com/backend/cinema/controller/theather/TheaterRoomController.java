package com.backend.cinema.controller.theather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.model.theater.TheaterRoom;
import com.backend.cinema.service.theater.TheaterRoomService;

import java.util.List;

@RestController
@RequestMapping("/api/theater-rooms")
public class TheaterRoomController {

    @Autowired
    private TheaterRoomService theaterRoomService;

    @GetMapping
    public List<TheaterRoom> getAllTheaterRooms() {
        return theaterRoomService.findAll();
    }

    @GetMapping("/{id}")

    public ResponseEntity<TheaterRoom> getTheaterRoomById(@PathVariable Long id) {
        return theaterRoomService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TheaterRoom createTheaterRoom(@RequestBody TheaterRoom theaterRoom) {
        return theaterRoomService.save(theaterRoom);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TheaterRoom> updateTheaterRoom(@PathVariable Long id, @RequestBody TheaterRoom theaterRoomDetails) {
        return theaterRoomService.findById(id)
                .map(theaterRoom -> {
                    theaterRoom.setIdRoom(theaterRoomDetails.getIdRoom());
                    theaterRoom.setMaxAmount(theaterRoomDetails.getMaxAmount());
                    return ResponseEntity.ok(theaterRoomService.save(theaterRoom));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTheaterRoom(@PathVariable Long id) {
        return theaterRoomService.findById(id)
                .map(theaterRoom -> {
                    theaterRoomService.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
