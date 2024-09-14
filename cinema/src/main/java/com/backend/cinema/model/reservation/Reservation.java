package com.backend.cinema.model.reservation;

import com.backend.cinema.model.theater.ScreeningSchedule;
import com.backend.cinema.model.user.Customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int amountTicketsReserved;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "screening_schedule_id")
    private ScreeningSchedule screeningSchedule;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAmountTicketsReserved() {
        return amountTicketsReserved;
    }

    public void setAmountTicketsReserved(int amountTicketsReserved) {
        this.amountTicketsReserved = amountTicketsReserved;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ScreeningSchedule getScreeningSchedule() {
        return screeningSchedule;
    }

    public void setScreeningSchedule(ScreeningSchedule screeningSchedule) {
        this.screeningSchedule = screeningSchedule;
    }

}
