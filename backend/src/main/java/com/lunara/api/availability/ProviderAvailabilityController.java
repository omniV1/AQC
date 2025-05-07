package com.lunara.api.availability;

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
import com.lunara.api.user.User;
import com.lunara.api.error.ErrorResponse;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/availability")
@RequiredArgsConstructor
@Tag(name = "Provider Availability", description = "Provider availability management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class ProviderAvailabilityController {

    private final ProviderAvailabilityService availabilityService;

    @Operation(
        summary = "Get provider availability",
        description = "Retrieves the availability schedule for the authenticated provider"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Availability schedule retrieved successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ProviderAvailability.class)
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
    public ResponseEntity<List<ProviderAvailability>> getAvailability(@AuthenticationPrincipal User provider) {
        return ResponseEntity.ok(availabilityService.getProviderAvailability(provider));
    }

    @Operation(
        summary = "Set provider availability",
        description = "Sets the availability for a specific day of the week"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Availability set successfully",
            content = @Content(
                mediaType = MediaType.APPLICATION_JSON_VALUE,
                schema = @Schema(implementation = ProviderAvailability.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid availability data",
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
    @PutMapping("/{dayOfWeek}")
    public ResponseEntity<ProviderAvailability> setAvailability(
            @AuthenticationPrincipal User provider,
            @PathVariable Integer dayOfWeek,
            @RequestBody AvailabilityRequest request) {
        return ResponseEntity.ok(
            availabilityService.setAvailability(
                provider,
                dayOfWeek,
                request.getStartTime(),
                request.getEndTime(),
                request.getIsAvailable()
            )
        );
    }
} 