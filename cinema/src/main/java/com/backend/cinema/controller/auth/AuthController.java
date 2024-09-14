package com.backend.cinema.controller.auth;

import com.backend.cinema.DTO.AuthRequest;
import com.backend.cinema.DTO.RegisterRequest;
import com.backend.cinema.DTO.UserResponse;
import com.backend.cinema.controller.movie.MovieController;
import com.backend.cinema.service.user.UserService;
import com.backend.cinema.util.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
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
    public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/register/customer")
    public ResponseEntity<String> registerCustomer(@RequestBody RegisterRequest registerRequest) {
        try {
            userService.registerCustomer(registerRequest);
            return ResponseEntity.ok("Customer registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Registration failed");
        }
    }

    @PostMapping("/register/collaborator")
    public ResponseEntity<String> registerCollaborator(@RequestBody RegisterRequest registerRequest) {
        try {
            userService.registerCollaborator(registerRequest);
            return ResponseEntity.ok("Collaborator registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Registration failed");
        }
    }

    @GetMapping("/login")
    public ResponseEntity<UserResponse> loginWithToken(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;

            String username = jwtUtil.extractUsername(jwtToken);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            String role = userDetails.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .orElse("ROLE_USER");

            UserResponse userResponse = new UserResponse(userDetails.getUsername(), role);

            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).build(); 
        }
    }
}
