package com.backend.cinema.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cinema.model.user.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByUsername(String username);
}
