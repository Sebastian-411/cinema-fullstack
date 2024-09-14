package com.backend.cinema.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.backend.cinema.util.FileStorageProperties;

import java.io.File;

@Component
public class StartupRunner implements CommandLineRunner {

    @Autowired
    private FileStorageProperties fileStorageProperties;

    @Override
    public void run(String... args) throws Exception {
        File uploadDir = new File(fileStorageProperties.getUploadDir());
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
    }
}
