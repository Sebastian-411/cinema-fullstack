package com.backend.cinema.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.user.Collaborator;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
    Collaborator findByUsername(String username);
}
