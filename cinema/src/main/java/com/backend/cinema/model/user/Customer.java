package com.backend.cinema.model.user;

import jakarta.persistence.Entity;

@Entity
public class Customer extends User{

    public Customer() {
        super.setRole("ROLE_CUSTOMER");
    }

}
