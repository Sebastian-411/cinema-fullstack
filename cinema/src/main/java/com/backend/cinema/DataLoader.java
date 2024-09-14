package com.backend.cinema;

import com.backend.cinema.model.movie.Movie;
import com.backend.cinema.model.reservation.Reservation;
import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.model.theater.TheaterRoom;
import com.backend.cinema.model.user.Customer;
import com.backend.cinema.model.user.Collaborator;
import com.backend.cinema.repository.movie.MovieRepository;
import com.backend.cinema.repository.reservation.ReservationRepository;
import com.backend.cinema.repository.theater.ScreeningScheduleRepository;
import com.backend.cinema.repository.theater.TheaterRoomRepository;
import com.backend.cinema.repository.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final ReservationRepository reservationRepository;
    private final ScreeningScheduleRepository screeningScheduleRepository;
    private final TheaterRoomRepository theaterRoomRepository;
    private final UserRepository userRepository;

    public DataLoader(MovieRepository movieRepository,
                      ReservationRepository reservationRepository,
                      ScreeningScheduleRepository screeningScheduleRepository,
                      TheaterRoomRepository theaterRoomRepository,
                      UserRepository userRepository) {
        this.movieRepository = movieRepository;
        this.reservationRepository = reservationRepository;
        this.screeningScheduleRepository = screeningScheduleRepository;
        this.theaterRoomRepository = theaterRoomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if movies are already present
        if (movieRepository.count() == 0) {
            // Create Movies
            Movie movie1 = new Movie();
            movie1.setTitle("Inception");
            movie1.setDirector("Christopher Nolan");
            movie1.setDuration(148);
            movie1.setReleaseDate(LocalDate.of(2010, 7, 16));
            movie1.setImageUrl("https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649");

            Movie movie2 = new Movie();
            movie2.setTitle("The Matrix");
            movie2.setDirector("The Wachowskis");
            movie2.setDuration(136);
            movie2.setReleaseDate(LocalDate.of(1999, 3, 31));
            movie2.setImageUrl("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");

            movieRepository.saveAll(Arrays.asList(movie1, movie2));

            // Create Theater Rooms
            TheaterRoom room1 = new TheaterRoom();
            room1.setIdRoom(1);
            room1.setMaxAmount(100);

            TheaterRoom room2 = new TheaterRoom();
            room2.setIdRoom(2);
            room2.setMaxAmount(150);

            theaterRoomRepository.saveAll(Arrays.asList(room1, room2));

            // Create Screening Schedules
            ScreeningSchedule schedule1 = new ScreeningSchedule();
            schedule1.setDateInit(LocalDateTime.of(2024, 9, 15, 19, 0));
            schedule1.setMovie(movie1);
            schedule1.setRoom(room1);
            schedule1.setAvailableTickets(room1.getMaxAmount());

            ScreeningSchedule schedule2 = new ScreeningSchedule();
            schedule2.setDateInit(LocalDateTime.of(2024, 9, 16, 21, 0));
            schedule2.setMovie(movie2);
            schedule2.setRoom(room2);
            schedule2.setAvailableTickets(room2.getMaxAmount());

            screeningScheduleRepository.saveAll(Arrays.asList(schedule1, schedule2));

            // Create Users
            Customer customer = new Customer();
            customer.setUsername("john_doe");
            customer.setPassword("password");
            userRepository.save(customer);

            Collaborator collaborator = new Collaborator();
            collaborator.setUsername("jane_doe");
            collaborator.setPassword("password");
            userRepository.save(collaborator);

            // Create Reservations
            Reservation reservation1 = new Reservation();
            reservation1.setAmountTicketsReserved(2);
            reservation1.setCustomer(customer);
            reservation1.setScreeningSchedule(schedule1);

            Reservation reservation2 = new Reservation();
            reservation2.setAmountTicketsReserved(4);
            reservation2.setCustomer(customer);
            reservation2.setScreeningSchedule(schedule2);

            reservationRepository.saveAll(Arrays.asList(reservation1, reservation2));
        }
    }
}
