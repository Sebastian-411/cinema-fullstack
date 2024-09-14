package com.backend.cinema.service.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.cinema.util.FileStorageProperties;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    @Autowired
    private FileStorageProperties fileStorageProperties;

    private Path getPath(String fileName) {
        return Paths.get(fileStorageProperties.getUploadDir()).resolve(fileName);
    }

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replace(" ", "_");
        Path path = getPath(fileName);
        Files.copy(file.getInputStream(), path);
        return fileName;
    }

    public File loadFile(String fileName) {
        return getPath(fileName).toFile();
    }
}
