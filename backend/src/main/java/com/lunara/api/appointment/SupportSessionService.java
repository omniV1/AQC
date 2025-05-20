package com.lunara.api.appointment;

import com.lunara.api.appointment.dto.SupportSessionDTO;
import com.lunara.api.appointment.dto.CreateSupportSessionRequest;
import com.lunara.api.appointment.dto.ProviderAvailabilityDTO;
import com.lunara.api.exception.ResourceNotFoundException;
import com.lunara.api.repository.SupportSessionRepository;
import com.lunara.api.repository.ProviderAvailabilityRepository;
import com.lunara.api.repository.AppointmentRepository;
import com.lunara.api.user.User;
import com.lunara.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Service for managing support sessions between clients and support providers.
 * Handles scheduling, validation, and status management.
 */
@Service
@RequiredArgsConstructor
public class SupportSessionService {
    private final SupportSessionRepository supportSessionRepository;
    private final ProviderAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public List<ProviderAvailabilityDTO> getProviderAvailability(UUID providerId, LocalDateTime startDate, LocalDateTime endDate) {
        return availabilityRepository.findAvailabilityInRange(providerId, startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<SupportSessionDTO> getUserSupportSessions(UUID userId, LocalDateTime startDate, LocalDateTime endDate) {
        return supportSessionRepository.findUserSupportSessionsInRange(userId, startDate, endDate);
    }

    @Transactional
    public SupportSessionDTO scheduleSupportSession(User currentClient, CreateSupportSessionRequest request) {
        User provider = userRepository.findById(request.getProviderId())
            .orElseThrow(() -> new ResourceNotFoundException("Provider not found: " + request.getProviderId()));

        availabilityRepository
            .findByProviderIdAndDayOfWeekAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                request.getProviderId(), 
                request.getStartTime().getDayOfWeek().getValue(),
                request.getStartTime().toLocalTime(),
                request.getEndTime().toLocalTime()
            )
            .orElseThrow(() -> new IllegalArgumentException("Provider not available at the requested time or slot definition not found."));
        
        boolean hasConflict = appointmentRepository.hasConflictingAppointments(
            request.getProviderId(),
            request.getStartTime(),
            request.getEndTime(),
            null
        );

        if (hasConflict) {
            throw new IllegalArgumentException("Selected time slot is already booked for an appointment.");
        }

        Appointment appointment = Appointment.builder()
            .client(currentClient)
            .provider(provider)
            .startTime(request.getStartTime())
            .endTime(request.getEndTime())
            .status("SCHEDULED")
            .appointmentType(request.getAppointmentType())
            .notes(request.getNotes())
            .build();
        Appointment savedAppointment = appointmentRepository.save(appointment);

        SupportSession supportSession = SupportSession.builder()
            .appointment(savedAppointment)
            .approvalStatus(ApprovalStatus.PENDING)
            .sessionType(request.getSessionType())
            .recommendations(request.getRecommendations())
            .resourcesProvided(request.getResourcesProvided())
            .followUpRequired(request.getFollowUpRequired() != null ? request.getFollowUpRequired() : false)
            .followUpDate(request.getFollowUpDate())
            .followUpNotes(request.getFollowUpNotes())
            .location(request.getLocation())
            .build();

        SupportSession savedSupportSession = supportSessionRepository.save(supportSession);
        return SupportSessionDTO.fromEntity(savedSupportSession);
    }

    @Transactional
    public void cancelSupportSession(UUID supportSessionId, UUID userId, String cancellationReason) {
        SupportSession session = supportSessionRepository.findById(supportSessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Support session not found: " + supportSessionId));
        
        Appointment appointment = session.getAppointment();
        if (appointment == null) {
            throw new IllegalStateException("Support session is not associated with an appointment.");
        }

        User clientUser = appointment.getClient();
        User providerUser = appointment.getProvider();

        if ((clientUser == null || !clientUser.getId().equals(userId)) && 
            (providerUser == null || !providerUser.getId().equals(userId))) {
            throw new IllegalArgumentException("Not authorized to modify this support session/appointment.");
        }

        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);
        
        ApprovalStatus cancelStatus = ApprovalStatus.CANCELLED_BY_CLIENT;
        if (providerUser != null && providerUser.getId().equals(userId)) {
            cancelStatus = ApprovalStatus.CANCELLED_BY_PROVIDER;
        }
        session.setApprovalStatus(cancelStatus);
        session.setCancellationReason(cancellationReason);
        supportSessionRepository.save(session);
    }

    @Transactional
    public SupportSessionDTO updateSupportSessionApproval(UUID supportSessionId, ApprovalStatus approvalStatus, User approver) {
        SupportSession session = supportSessionRepository.findById(supportSessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Support session not found: " + supportSessionId));
        
        Appointment appointment = session.getAppointment();
        if (appointment == null) {
             throw new IllegalStateException("Support session is not associated with an appointment for approval.");
        }
        
        if (appointment.getProvider() == null || !appointment.getProvider().getId().equals(approver.getId())) {
            // This logic can be refined based on roles if admins, etc., can also approve
            // throw new IllegalArgumentException("User not authorized to approve/reject this session.");
        }

        session.setApprovalStatus(approvalStatus);
        SupportSession updatedSession = supportSessionRepository.save(session);
        
        if (approvalStatus == ApprovalStatus.APPROVED) {
            appointment.setStatus("CONFIRMED"); 
            appointmentRepository.save(appointment);
        } else if (approvalStatus == ApprovalStatus.REJECTED) {
            // Optionally, set appointment status differently if rejected
            // appointment.setStatus("PENDING_CLIENT_ACTION"); 
            // appointmentRepository.save(appointment);
        }
        
        return SupportSessionDTO.fromEntity(updatedSession);
    }

    @Transactional(readOnly = true)
    public List<SupportSession> getSupportSessionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return supportSessionRepository.findByAppointment_StartTimeBetween(start, end);
    }

    @Transactional
    public SupportSessionDTO updateAppointmentStatus(UUID supportSessionId, String newStatus, User currentUser) {
        SupportSession session = supportSessionRepository.findById(supportSessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Support session not found: " + supportSessionId));

        Appointment appointment = session.getAppointment();
        if (appointment == null) {
            throw new IllegalStateException("Support session is not associated with an appointment.");
        }

        // Authorization check: Ensure the current user is either the client or the provider
        User clientUser = appointment.getClient();
        User providerUser = appointment.getProvider();

        boolean isClient = clientUser != null && clientUser.getId().equals(currentUser.getId());
        boolean isProvider = providerUser != null && providerUser.getId().equals(currentUser.getId());

        if (!isClient && !isProvider) {
            // Potentially allow admins or other roles here in the future
            throw new IllegalArgumentException("User not authorized to update the status of this appointment.");
        }

        // Validate newStatus if necessary (e.g., against an enum or a list of allowed statuses)
        // For now, directly setting it. Consider an AppointmentStatus enum in the Appointment entity.
        appointment.setStatus(newStatus);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        
        // The session itself might not have changed, but we return its DTO
        // as the update was initiated via the session.
        // If only appointment changed, one might also consider returning an AppointmentDTO.
        return SupportSessionDTO.fromEntity(session); 
    }
} 