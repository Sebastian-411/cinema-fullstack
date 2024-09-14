package com.backend.cinema.service.theater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.cinema.model.theater.TheaterRoom;
import com.backend.cinema.repository.theater.TheaterRoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TheaterRoomService {

    @Autowired
    private TheaterRoomRepository theaterRoomRepository;

    public List<TheaterRoom> findAll() {
        return theaterRoomRepository.findAll();
    }

    public Optional<TheaterRoom> findById(Long id) {
        return theaterRoomRepository.findById(id);
    }

    public TheaterRoom save(TheaterRoom theaterRoom) {
        return theaterRoomRepository.save(theaterRoom);
    }

    public void deleteById(Long id) {
        theaterRoomRepository.deleteById(id);
    }
}
