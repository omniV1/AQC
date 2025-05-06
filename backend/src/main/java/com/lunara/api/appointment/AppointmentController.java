package com.lunara.api.appointment;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.repository.AppointmentRepository;
import com.lunara.api.user.User;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointments", description = "Appointment management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    @Operation(summary = "Create a new appointment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(
            @AuthenticationPrincipal User user,
            @RequestBody Appointment appointment) {
        appointment.setClient(user);
        appointment.setStatus(AppointmentStatus.SCHEDULED.name());
        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @Operation(summary = "Get all appointments for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of appointments retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<List<Appointment>> getMyAppointments(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentRepository.findByClient(user));
    }

    @Operation(summary = "Get appointment by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment found"),
        @ApiResponse(responseCode = "404", description = "Appointment not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(
            @Parameter(description = "Appointment ID") @PathVariable Long id) {
        return ResponseEntity.ok(appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found")));
    }

    @Operation(summary = "Update appointment status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment updated"),
        @ApiResponse(responseCode = "404", description = "Appointment not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @Parameter(description = "Appointment ID") @PathVariable Long id,
            @Parameter(description = "New status") @RequestParam String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @Operation(summary = "Get appointments by date range")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of appointments retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/range")
    public ResponseEntity<List<Appointment>> getAppointmentsByDateRange(
            @Parameter(description = "Start date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @Parameter(description = "End date-time (yyyy-MM-dd'T'HH:mm:ss)")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(appointmentRepository.findByStartTimeBetween(start, end));
    }
} 