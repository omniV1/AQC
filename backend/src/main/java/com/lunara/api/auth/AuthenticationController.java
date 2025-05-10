package com.lunara.api.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.user.User;
import com.lunara.api.exceptions.ForbiddenException;
import com.lunara.api.exceptions.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;
import java.util.HashMap;
import java.util.Map;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;

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
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    /**
     * Registers a new provider in the system.
     * This endpoint requires a special registration code for security.
     */
    @Operation(
        summary = "Register a new provider",
        description = "Creates a new provider account with enhanced security measures"
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
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Invalid registration code",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @PostMapping("/register/provider")
    public ResponseEntity<AuthenticationResponse> registerProvider(
            @Valid @RequestBody RegisterProviderRequest request
    ) {
        log.info("Received provider registration request for email: {}", request.getEmail());
        
        // Validate registration code
        if (!service.isValidRegistrationCode(request.getRegistrationCode())) {
            log.warn("Invalid registration code provided");
            throw new ForbiddenException("Invalid registration code");
        }

        // Validate password strength
        if (!service.isPasswordStrong(request.getPassword())) {
            log.warn("Password does not meet security requirements");
            throw new BadRequestException("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character");
        }

        AuthenticationResponse response = service.registerProvider(request);
        log.info("Provider registration successful for email: {}", request.getEmail());
        return ResponseEntity.ok(response);
    }

    /**
     * Allows providers to register new clients.
     * Only accessible by providers and admins.
     */
    @Operation(
        summary = "Register a new client",
        description = "Creates a new client account (requires provider authentication)"
    )
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Successfully registered client",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = AuthenticationResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Not authorized to register clients",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @PostMapping("/register/client")
    @PreAuthorize("hasAnyRole('PROVIDER', 'ADMIN')")
    public ResponseEntity<AuthenticationResponse> registerClient(
            @AuthenticationPrincipal User provider,
            @RequestBody CreateClientRequest request
    ) {
        return ResponseEntity.ok(service.registerClient(provider, request));
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
            @Valid @RequestBody AuthenticationRequest request
    ) {
        log.info("Received authentication request for email: {}", request.getEmail());
        try {
            AuthenticationResponse response = service.authenticate(request);
            log.info("Authentication successful for user: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Authentication failed for user: {}", request.getEmail(), e);
            throw e;
        }
    }

    @GetMapping("/registration-code")
    @Profile("dev")  // Only available in development
    public ResponseEntity<String> getRegistrationCode() {
        return ResponseEntity.ok(service.getRegistrationCode());
    }

    @Operation(
        summary = "Logout user",
        description = "Invalidates the user's session and clears authentication"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Successfully logged out",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE
            )
        )
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Clear the security context
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAllExceptions(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        log.error("Error occurred: ", ex);
        return ResponseEntity.badRequest().body(error);
    }
} 