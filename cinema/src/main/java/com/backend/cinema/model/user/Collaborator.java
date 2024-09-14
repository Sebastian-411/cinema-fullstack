package com.backend.cinema.model.user;

import jakarta.persistence.Entity;

@Entity
public class Collaborator extends User {
    

    public Collaborator() {
        super.setRole("ROLE_COLLABORATOR");
    }

}
