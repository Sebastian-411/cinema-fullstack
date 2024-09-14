package com.backend.cinema.repository.movie;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.movie.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
