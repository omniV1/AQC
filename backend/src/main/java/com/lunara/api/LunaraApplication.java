package com.lunara.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LunaraApplication {
    public static void main(String[] args) {
        SpringApplication.run(LunaraApplication.class, args);
    }
} 