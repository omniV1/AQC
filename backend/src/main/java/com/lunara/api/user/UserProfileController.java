package com.lunara.api.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.repository.UserProfileRepository;
import com.lunara.api.error.ErrorResponse;

/**
 * Controller for managing user profile information.
 * Handles operations related to viewing and updating user profiles.
 * All endpoints require authentication.
 */
@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@Tag(name = "User Profile", description = "User profile management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class UserProfileController {

    private final UserProfileRepository userProfileRepository;

    /**
     * Retrieves the profile for the authenticated user.
     * If no profile exists, creates a new empty profile.
     *
     * @param user The authenticated user (injected by Spring Security)
     * @return The user's profile or a new profile if none exists
     */
    @Operation(
        summary = "Get user profile",
        description = "Retrieves the profile for the authenticated user. Creates a new empty profile if none exists."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Profile retrieved successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = UserProfile.class)
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @GetMapping
    public ResponseEntity<UserProfile> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            userProfileRepository.findByUser(user)
                .orElseGet(() -> UserProfile.builder().user(user).build())
        );
    }

    /**
     * Updates the profile for the authenticated user.
     * Creates a new profile if none exists.
     *
     * @param user The authenticated user (injected by Spring Security)
     * @param profile The updated profile information
     * @return The updated user profile
     */
    @Operation(
        summary = "Update user profile",
        description = "Updates the profile for the authenticated user. Creates a new profile if none exists."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Profile updated successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = UserProfile.class)
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
            responseCode = "401",
            description = "Unauthorized",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        )
    })
    @PutMapping
    public ResponseEntity<UserProfile> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody UserProfile profile) {
        profile.setUser(user);
        return ResponseEntity.ok(userProfileRepository.save(profile));
    }
} 