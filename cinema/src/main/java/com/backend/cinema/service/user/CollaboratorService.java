package com.backend.cinema.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.cinema.model.user.Collaborator;
import com.backend.cinema.model.user.Customer;
import com.backend.cinema.repository.user.CollaboratorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CollaboratorService {

    @Autowired
    private CollaboratorRepository collaboratorRepository;

    public List<Collaborator> getAllCollaborators() {
        return collaboratorRepository.findAll();
    }

    public Optional<Collaborator> getCollaboratorById(Long id) {
        return collaboratorRepository.findById(id);
    }

    public Collaborator getCollaboratorByUsername(String username) {
        return collaboratorRepository.findByUsername(username);
    }

    public Collaborator updateCollaborator(Long id, Collaborator collaborator) {
        return collaboratorRepository.findById(id)
                .map(existingCollaborator -> {
                    existingCollaborator.setUsername(collaborator.getUsername());
                    return collaboratorRepository.save(existingCollaborator);
                })
                .orElse(null);
    }
    
    public boolean deleteCollaborator(Long id) {
        collaboratorRepository.deleteById(id);
        return !collaboratorRepository.existsById(id);
    }
}
