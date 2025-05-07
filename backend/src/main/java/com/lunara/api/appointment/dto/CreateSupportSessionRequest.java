package com.lunara.api.appointment.dto;

import com.lunara.api.appointment.SupportSessionType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSupportSessionRequest {
    @NotNull(message = "Provider ID is required")
    private Long providerId;

    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    private LocalDateTime endTime;

    @NotNull(message = "Session type is required")
    private SupportSessionType sessionType;

    private String notes;
    private String location;
} 