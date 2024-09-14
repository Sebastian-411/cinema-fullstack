package com.backend.cinema.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.model.user.Collaborator;
import com.backend.cinema.model.user.Customer;
import com.backend.cinema.service.user.CollaboratorService;
import com.backend.cinema.service.user.CustomerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/collaborators")
public class CollaboratorController {

    @Autowired
    private CollaboratorService collaboratorService;

    @GetMapping("/private-collaborator")
    public ResponseEntity<List<Collaborator>> getAllCollaborators() {
        return ResponseEntity.ok(collaboratorService.getAllCollaborators());
    }

    @GetMapping("/private-collaborator/{id}")
    public ResponseEntity<Collaborator> getCollaboratorById(@PathVariable Long id) {
        Optional<Collaborator> collaborator = collaboratorService.getCollaboratorById(id);
        if (collaborator.isPresent()) {
            return ResponseEntity.ok(collaborator.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/private-collaborator/username/{username}")
    public ResponseEntity<Collaborator> getCollaboratorByUsername(@PathVariable String username) {
        Collaborator collaborator = collaboratorService.getCollaboratorByUsername(username);
        if (collaborator != null) {
            return ResponseEntity.ok(collaborator);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/private-collaborator/{id}")
    public ResponseEntity<Collaborator> updateCollaborator(@PathVariable Long id, @RequestBody Collaborator collaborator) {
        Collaborator updatedCollaborator = collaboratorService.updateCollaborator(id, collaborator);
        if (updatedCollaborator != null) {
            return ResponseEntity.ok(updatedCollaborator);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/private-collaborator/{id}")
    public ResponseEntity<Void> deleteCollaborator(@PathVariable Long id) {
        if (collaboratorService.deleteCollaborator(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
