package com.lunara.api.checkin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.repository.DailyCheckInRepository;
import com.lunara.api.user.Client;
import com.lunara.api.error.ErrorResponse;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Controller for managing daily check-ins and mood tracking.
 * Provides endpoints for submitting and retrieving daily wellness check-ins.
 * All endpoints require authentication.
 */
@RestController
@RequestMapping("/api/v1/checkins")
@RequiredArgsConstructor
@Tag(name = "Daily Check-ins", description = "Daily mood and wellness tracking APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class DailyCheckInController {

    private final DailyCheckInRepository checkInRepository;

    /**
     * Submits a new daily check-in for the authenticated client.
     * Records mood level, physical symptoms, emotional notes, and other wellness metrics.
     *
     * @param client The authenticated client (injected by Spring Security)
     * @param checkIn The check-in data to be recorded
     * @return The saved check-in record
     */
    @Operation(
        summary = "Submit daily check-in",
        description = "Records a new daily check-in with mood level, symptoms, and wellness metrics"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Check-in recorded successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = DailyCheckIn.class)
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
    @PostMapping
    public ResponseEntity<DailyCheckIn> submitCheckIn(
            @AuthenticationPrincipal Client client,
            @RequestBody @Schema(description = "Daily check-in details") DailyCheckIn checkIn) {
        checkIn.setClient(client);
        return ResponseEntity.ok(checkInRepository.save(checkIn));
    }

    /**
     * Retrieves the complete check-in history for the authenticated client.
     * Results are ordered by creation date in descending order (newest first).
     *
     * @param client The authenticated client (injected by Spring Security)
     * @return List of all check-ins for the client
     */
    @Operation(
        summary = "Get client's check-in history",
        description = "Retrieves all check-ins for the client, ordered by date (newest first)"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Check-in history retrieved",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = DailyCheckIn.class)
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
    public ResponseEntity<List<DailyCheckIn>> getCheckInHistory(
            @AuthenticationPrincipal Client client) {
        return ResponseEntity.ok(checkInRepository.findByClientOrderByCreatedAtDesc(client));
    }

    /**
     * Retrieves check-ins within a specified date range for the authenticated client.
     * Results are ordered by creation date in descending order (newest first).
     *
     * @param client The authenticated client (injected by Spring Security)
     * @param start Start of the date range
     * @param end End of the date range
     * @return List of check-ins within the specified date range
     */
    @Operation(
        summary = "Get check-ins by date range",
        description = "Retrieves check-ins between specified dates, ordered by date (newest first)"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Check-ins retrieved",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = DailyCheckIn.class)
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
    public ResponseEntity<List<DailyCheckIn>> getCheckInsByDateRange(
            @AuthenticationPrincipal Client client,
            @Parameter(description = "Start date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @Schema(example = "2024-01-01T00:00:00")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @Parameter(description = "End date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @Schema(example = "2024-01-31T23:59:59")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(
            checkInRepository.findByClientAndCreatedAtBetweenOrderByCreatedAtDesc(client, start, end)
        );
    }
} 