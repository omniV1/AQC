package com.lunara.api.appointment.dto;

import com.lunara.api.appointment.SupportSessionType;
// Potentially add an enum for AppointmentType if you create one
// import com.lunara.api.appointment.AppointmentType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSupportSessionRequest {
    @NotNull(message = "Provider ID is required")
    private UUID providerId;

    // Client ID will be taken from the authenticated User in the service method

    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    private LocalDateTime endTime;

    // Appointment specific fields
    @NotNull(message = "Appointment type is required")
    private String appointmentType; // Or use an Enum like AppointmentType

    private String notes; // General appointment notes

    // SupportSession specific fields
    @NotNull(message = "Session type is required")
    private SupportSessionType sessionType; 

    private String location; // SupportSession specific location
    private String recommendations;
    private String resourcesProvided; // Expecting JSON string
    private Boolean followUpRequired;
    private LocalDateTime followUpDate;
    private String followUpNotes;
    // cancellationReason is typically not part of a create request
} 