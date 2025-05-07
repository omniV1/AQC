package com.lunara.api.availability;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request object for updating provider availability")
public class AvailabilityRequest {
    @Schema(description = "Start time of availability window", example = "09:00")
    private LocalTime startTime;

    @Schema(description = "End time of availability window", example = "17:00")
    private LocalTime endTime;

    @Schema(description = "Whether the provider is available during this time", example = "true")
    private Boolean isAvailable;
} 