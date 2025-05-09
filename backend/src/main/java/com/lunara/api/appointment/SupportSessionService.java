package com.lunara.api.appointment;

import com.lunara.api.appointment.dto.SupportSessionDTO;
import com.lunara.api.appointment.dto.CreateSupportSessionRequest;
import com.lunara.api.appointment.dto.ProviderAvailabilityDTO;
import com.lunara.api.availability.ProviderAvailability;
import com.lunara.api.exception.ResourceNotFoundException;
import com.lunara.api.repository.SupportSessionRepository;
import com.lunara.api.repository.ProviderAvailabilityRepository;
import com.lunara.api.user.User;
import com.lunara.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
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

    @Transactional(readOnly = true)
    public List<ProviderAvailabilityDTO> getProviderAvailability(UUID providerId, LocalDateTime startDate, LocalDateTime endDate) {
        return availabilityRepository.findAvailabilityInRange(providerId, startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<SupportSessionDTO> getUserSupportSessions(UUID userId, LocalDateTime startDate, LocalDateTime endDate) {
        return supportSessionRepository.findUserSupportSessionsInRange(userId, startDate, endDate);
    }

    @Transactional
    public SupportSessionDTO scheduleSupportSession(User client, CreateSupportSessionRequest request) {
        // Validate provider availability
        var provider = userRepository.findById(request.getProviderId())
            .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));

        var providerAvailability = availabilityRepository
            .findByProviderIdAndDayOfWeek(request.getProviderId(), request.getStartTime().getDayOfWeek().getValue() % 7)
            .orElseThrow(() -> new ResourceNotFoundException("Provider not available on this day"));

        LocalTime sessionStartTime = request.getStartTime().toLocalTime();
        LocalTime sessionEndTime = request.getEndTime().toLocalTime();

        // Check if the support session falls within provider's available hours
        if (sessionStartTime.isBefore(providerAvailability.getStartTime()) ||
            sessionEndTime.isAfter(providerAvailability.getEndTime())) {
            throw new IllegalArgumentException("Support session time outside provider's available hours");
        }

        // Check for conflicts with existing support sessions
        boolean hasConflict = supportSessionRepository.hasConflictingSupportSessions(
            request.getProviderId(),
            request.getStartTime(),
            request.getEndTime()
        );

        if (hasConflict) {
            throw new IllegalArgumentException("Selected time slot is already booked");
        }

        // Create the support session
        var session = SupportSession.builder()
            .client(client)
            .provider(provider)
            .startTime(request.getStartTime())
            .endTime(request.getEndTime())
            .status(SupportSessionStatus.SCHEDULED)
            .approvalStatus(ApprovalStatus.PENDING)
            .sessionType(request.getSessionType())
            .notes(request.getNotes())
            .location(request.getLocation())
            .build();

        var savedSession = supportSessionRepository.save(session);
        return SupportSessionDTO.fromEntity(savedSession);
    }

    @Transactional
    public void cancelSupportSession(UUID sessionId, UUID userId) {
        var session = supportSessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Support session not found"));

        // Verify the user owns this support session
        if (!session.getClient().getId().equals(userId) && !session.getProvider().getId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to cancel this support session");
        }

        session.setStatus(SupportSessionStatus.CANCELLED);
        session.setApprovalStatus(ApprovalStatus.CANCELLED_BY_CLIENT);
        supportSessionRepository.save(session);
    }

    @Transactional
    public SupportSession updateSupportSessionStatus(UUID sessionId, String status) {
        var session = supportSessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResourceNotFoundException("Support session not found"));
        
        try {
            session.setStatus(SupportSessionStatus.valueOf(status.toUpperCase()));
            return supportSessionRepository.save(session);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid support session status: " + status);
        }
    }

    @Transactional(readOnly = true)
    public List<SupportSession> getSupportSessionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return supportSessionRepository.findByStartTimeBetween(start, end);
    }
} 