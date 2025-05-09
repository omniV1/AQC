package com.lunara.api.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "lunara.security.jwt")
@Data
public class JwtConfig {
    private String secretKey;
    private long expiration;
} 