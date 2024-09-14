package com.backend.cinema.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class MovieWithSchedulesDTO {
    
    private Long id;
    private String title;
    private String director;
    private int duration;
    private LocalDate releaseDate;
    private String imageUrl;
    private List<ScreeningScheduleDTO> schedules;
    
    // Getters and Setters

    public static class ScreeningScheduleDTO {
        private Long id;
        private LocalDateTime dateInit;
        private Long movieId;
        private Long roomId;

        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        public LocalDateTime getDateInit() {
            return dateInit;
        }
        public void setDateInit(LocalDateTime dateInit) {
            this.dateInit = dateInit;
        }
        public Long getMovieId() {
            return movieId;
        }
        public void setMovieId(Long movieId) {
            this.movieId = movieId;
        }
        public long getRoomId() {
            return roomId;
        }
        public void setRoomId(long roomId) {
            this.roomId = roomId;
        }
        
        // Getters and Setters
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<ScreeningScheduleDTO> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<ScreeningScheduleDTO> schedules) {
        this.schedules = schedules;
    }
}
