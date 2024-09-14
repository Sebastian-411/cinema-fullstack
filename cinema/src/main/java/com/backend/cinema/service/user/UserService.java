package com.backend.cinema.service.user;

import com.backend.cinema.model.user.Customer;
import com.backend.cinema.repository.user.UserRepository;
import com.backend.cinema.DTO.RegisterRequest;
import com.backend.cinema.model.user.Collaborator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerCustomer(RegisterRequest registerRequest) {
        Customer customer = new Customer();
        customer.setUsername(registerRequest.getUsername());
        customer.setRole("ROLE_CUSTOMER");
        customer.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(customer);
    }

    public void registerCollaborator(RegisterRequest registerRequest) {
        
        Collaborator collaborator = new Collaborator();
        collaborator.setUsername(registerRequest.getUsername());
        collaborator.setRole("ROLE_COLLABORATOR");
        collaborator.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(collaborator);
    }
}
