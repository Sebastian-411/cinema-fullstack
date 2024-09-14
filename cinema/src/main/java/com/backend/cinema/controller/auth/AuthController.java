package com.backend.cinema.controller.auth;

import com.backend.cinema.DTO.AuthRequest;
import com.backend.cinema.DTO.RegisterRequest;
import com.backend.cinema.service.user.UserService;
import com.backend.cinema.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return jwt;
    }

    @PostMapping("/register/customer")
    public ResponseEntity<String> registerCustomer(@RequestBody RegisterRequest registerRequest) {
        userService.registerCustomer(registerRequest);
        return ResponseEntity.ok("Customer registered successfully");
    }

    @PostMapping("/register/collaborator")
    public ResponseEntity<String> registerCollaborator(@RequestBody RegisterRequest registerRequest) {
        userService.registerCollaborator(registerRequest);
        return ResponseEntity.ok("Collaborator registered successfully");
    }

}
