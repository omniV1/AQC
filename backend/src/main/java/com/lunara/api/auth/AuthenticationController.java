package com.lunara.api.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller handling user authentication operations.
 * This includes user registration and login functionality.
 * All endpoints in this controller are public and do not require authentication.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * Registers a new user in the system.
     * Creates a new user account and returns a JWT token for immediate authentication.
     *
     * @param request Contains user registration details (firstName, lastName, email, password)
     * @return JWT token wrapped in ResponseEntity
     * @throws RuntimeException if email is already registered
     */
    @Operation(
        summary = "Register a new user",
        description = "Creates a new user account and returns a JWT token for immediate authentication"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Successfully registered",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = AuthenticationResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input - email already exists or invalid data",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    /**
     * Authenticates an existing user.
     * Validates credentials and returns a JWT token for authentication.
     *
     * @param request Contains login credentials (email, password)
     * @return JWT token wrapped in ResponseEntity
     * @throws RuntimeException if credentials are invalid
     */
    @Operation(
        summary = "Authenticate user",
        description = "Validates user credentials and returns a JWT token for authentication"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Successfully authenticated",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = AuthenticationResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Invalid credentials",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
} 