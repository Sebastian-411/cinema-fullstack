package com.backend.cinema.controller.movie;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.cinema.DTO.MovieWithSchedulesDTO;
import com.backend.cinema.model.movie.Movie;
import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.repository.movie.MovieRepository;
import com.backend.cinema.repository.theater.ScreeningScheduleRepository;
import com.backend.cinema.service.movie.MovieService;
import com.backend.cinema.service.upload.FileStorageService;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreeningScheduleRepository screeningScheduleRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.findAll();
    }

    @GetMapping("/screening-schedules")
    public List<MovieWithSchedulesDTO> getMoviesWithSchedules() {

        List<Movie> movies = movieRepository.findAll();

        List<ScreeningSchedule> schedules = screeningScheduleRepository.findAll();

        return movies.stream().map(movie -> {
            MovieWithSchedulesDTO dto = new MovieWithSchedulesDTO();
            dto.setId(movie.getId());
            dto.setTitle(movie.getTitle());
            dto.setDirector(movie.getDirector());
            dto.setDuration(movie.getDuration());
            dto.setReleaseDate(movie.getReleaseDate());
            dto.setImageUrl(movie.getImageUrl());

            List<MovieWithSchedulesDTO.ScreeningScheduleDTO> scheduleDTOs = schedules.stream()
                    .filter(schedule -> schedule.getMovie().getId().equals(movie.getId()))
                    .map(schedule -> {
                        MovieWithSchedulesDTO.ScreeningScheduleDTO scheduleDTO = new MovieWithSchedulesDTO.ScreeningScheduleDTO();
                        scheduleDTO.setId(schedule.getId());
                        scheduleDTO.setDateInit(schedule.getDateInit());
                        scheduleDTO.setMovieId(schedule.getMovie().getId());
                        scheduleDTO.setRoomId(schedule.getRoom().getIdRoom());
                        return scheduleDTO;
                    })
                    .collect(Collectors.toList());

            dto.setSchedules(scheduleDTOs);
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/private-collaborator")
    public ResponseEntity<Movie> createMovie(
            @ModelAttribute Movie movie,
            @RequestPart("file") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);

            movie.setImageUrl(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        Movie savedMovie = movieService.save(movie);
        return ResponseEntity.ok(savedMovie);
    }

    @PutMapping("/private-collaborator/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        return movieService.findById(id)
                .map(movie -> {
                    movie.setTitle(movieDetails.getTitle());
                    movie.setDirector(movieDetails.getDirector());
                    movie.setDuration(movieDetails.getDuration());
                    movie.setReleaseDate(movieDetails.getReleaseDate());
                    return ResponseEntity.ok(movieService.save(movie));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/private-collaborator/{id}")
    public ResponseEntity<Object> deleteMovie(@PathVariable Long id) {
        return movieService.findById(id)
                .map(movie -> {
                    movieService.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
