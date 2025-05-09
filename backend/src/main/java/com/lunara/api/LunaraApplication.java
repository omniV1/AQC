package com.lunara.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import com.lunara.api.security.JwtConfig;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({JwtConfig.class})
public class LunaraApplication {
    public static void main(String[] args) {
        SpringApplication.run(LunaraApplication.class, args);
    }
} 