package com.lunara.api.appointment;

import com.lunara.api.appointment.dto.SupportSessionDTO;
import com.lunara.api.appointment.dto.CreateSupportSessionRequest;
import com.lunara.api.appointment.dto.ProviderAvailabilityDTO;
import com.lunara.api.repository.UserRepository;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.user.User;
import com.lunara.api.error.ErrorResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Controller for managing support sessions between clients and support providers.
 * Provides endpoints for scheduling, updating, and retrieving support sessions.
 * All endpoints require authentication.
 */
@RestController
@RequestMapping("/api/v1/support-sessions")
@RequiredArgsConstructor
@Tag(name = "Support Sessions", description = "Support session management endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class SupportSessionController {

    private SupportSessionService supportSessionService;
    private UserRepository userRepository;

    public SupportSessionController(SupportSessionService supportSessionService, UserRepository userRepository) {
        this.supportSessionService = supportSessionService;
        this.userRepository = userRepository;
    }

    @Operation(
        summary = "Schedule a new support session",
        description = "Schedule a new support session with a provider. Includes conflict checking and validation."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Support session scheduled successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = SupportSessionDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input or scheduling conflict",
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
    @PostMapping
    public ResponseEntity<SupportSessionDTO> scheduleSupportSession(
            @AuthenticationPrincipal User client,
            @Valid @RequestBody CreateSupportSessionRequest request) {
        return ResponseEntity.ok(supportSessionService.scheduleSupportSession(client, request));
    }

    @Operation(
        summary = "Get all support sessions for the authenticated user",
        description = "Retrieves all support sessions where the authenticated user is either the client or provider"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "List of support sessions retrieved",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = SupportSessionDTO.class)
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
    public ResponseEntity<List<SupportSessionDTO>> getUserSupportSessions(
            @AuthenticationPrincipal User user,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(supportSessionService.getUserSupportSessions(user.getId(), startDate, endDate));
    }

    @Operation(
        summary = "Get support sessions by date range",
        description = "Retrieves all support sessions within the specified date range"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "List of support sessions retrieved",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = SupportSessionDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid date range",
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
    @GetMapping("/range")
    public ResponseEntity<List<Object>> getSupportSessionsByDateRange(
            @Parameter(description = "Start date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @Schema(example = "2024-04-01T09:00:00")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @Parameter(description = "End date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @Schema(example = "2024-04-01T10:00:00")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<SupportSession> sessions = supportSessionService.getSupportSessionsByDateRange(start, end);
        List<Object> dtos = sessions.stream()
                .map(session -> SupportSessionDTO.fromEntity(session).toFrontendFormat())
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Operation(
        summary = "Update support session status",
        description = "Updates the status of an existing support session (SCHEDULED, COMPLETED, CANCELLED)"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Support session updated successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = SupportSessionDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid status transition",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ErrorResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Support session not found",
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
    @PutMapping("/{id}/status")
    public ResponseEntity<SupportSessionDTO> updateSupportSessionStatus(
            @Parameter(description = "Support session ID") @PathVariable UUID id,
            @Parameter(description = "New status (SCHEDULED, COMPLETED, CANCELLED)")
            @Schema(allowableValues = {"SCHEDULED", "COMPLETED", "CANCELLED"})
            @RequestParam String status) {
        SupportSession updated = supportSessionService.updateSupportSessionStatus(id, status);
        return ResponseEntity.ok(SupportSessionDTO.fromEntity(updated));
    }

    @Operation(summary = "Get provider availability")
    @GetMapping("/providers/{providerId}/availability")
    public ResponseEntity<List<ProviderAvailabilityDTO>> getProviderAvailability(
            @PathVariable UUID providerId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(supportSessionService.getProviderAvailability(providerId, startDate, endDate));
    }

    @Operation(summary = "Cancel a support session")
    @PostMapping("/{sessionId}/cancel")
    public ResponseEntity<Void> cancelSupportSession(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sessionId) {
        supportSessionService.cancelSupportSession(sessionId, user.getId());
        return ResponseEntity.ok().build();
    }
} 