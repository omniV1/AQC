package com.lunara.api.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.error.ErrorResponse;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "User management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    @Operation(
        summary = "Get user data",
        description = "Retrieves basic user information for the authenticated user"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "User data retrieved successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = UserResponse.class)
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
    public ResponseEntity<UserResponse> getUserData(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.fromUser(user));
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserResponse {
        private String id;
        private String email;
        private String firstName;
        private String lastName;

        public static UserResponse fromUser(User user) {
            return builder()
                    .id(user.getId().toString())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .build();
        }
    }
} 