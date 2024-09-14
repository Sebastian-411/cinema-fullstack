package com.backend.cinema.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.backend.cinema.model.user.Customer;
import com.backend.cinema.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}