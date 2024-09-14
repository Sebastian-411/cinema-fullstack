package com.backend.cinema.DTO;

import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class UserResponse {
    private String username;
    private String role;

    public UserResponse(String username, String role) {
        this.username = username;
        this.role = role;
    }

   

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
