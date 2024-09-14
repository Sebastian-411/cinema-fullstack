package com.backend.cinema.controller.theather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<TheaterRoom>> getAllTheaterRooms() {
        return ResponseEntity.ok(theaterRoomService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TheaterRoom> getTheaterRoomById(@PathVariable Long id) {
        return theaterRoomService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TheaterRoom> createTheaterRoom(@RequestBody TheaterRoom theaterRoom) {
        try {
            TheaterRoom createdRoom = theaterRoomService.save(theaterRoom);
            return ResponseEntity.ok(createdRoom);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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
    public ResponseEntity<Void> deleteTheaterRoom(@PathVariable Long id) {
        if (theaterRoomService.findById(id).isPresent()) {
            theaterRoomService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
