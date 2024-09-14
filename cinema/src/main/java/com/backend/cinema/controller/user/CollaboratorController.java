package com.backend.cinema.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.cinema.model.user.Collaborator;
import com.backend.cinema.service.user.CollaboratorService;

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
    public ResponseEntity<Optional<Collaborator>> getCollaboratorById(@PathVariable Long id) {
        return ResponseEntity.ok(collaboratorService.getCollaboratorById(id));
    }

    @GetMapping("/private-collaborator/username/{username}")
    public ResponseEntity<Collaborator> getCollaboratorByUsername(@PathVariable String username) {
        return ResponseEntity.ok(collaboratorService.getCollaboratorByUsername(username));
    }

    @PutMapping("/private-collaborator/{id}")
    public ResponseEntity<Collaborator> updateCollaborator(@PathVariable Long id, @RequestBody Collaborator collaborator) {
        return ResponseEntity.ok(collaboratorService.updateCollaborator(id, collaborator));
    }

    @DeleteMapping("/private-collaborator/{id}")
    public ResponseEntity<Void> deleteCollaborator(@PathVariable Long id) {
        collaboratorService.deleteCollaborator(id);
        return ResponseEntity.noContent().build();
    }
}
