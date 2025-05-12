package com.lunara.api.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

/**
 * Configuration class for OpenAPI 3.0 documentation.
 * Defines the API information, security schemes, and servers.
 */
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Lunara API",
        version = "1.0",
        description = "REST API for Lunara Postpartum Support Platform",
        contact = @Contact(
            name = "Lunara Support",
            email = "support@lunara.com",
            url = "https://lunara.com"
        ),
        license = @License(
            name = "Private License",
            url = "https://lunara.com/license"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080/api",
            description = "Development server"
        )
    },
    security = {
        @SecurityRequirement(
            name = "Bearer Authentication"
        )
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    description = "JWT token authentication",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
    // Configuration is handled by annotations
} 