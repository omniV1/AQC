package com.lunara.api.repository;

import com.lunara.api.appointment.SupportSession;
import com.lunara.api.appointment.dto.SupportSessionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface SupportSessionRepository extends JpaRepository<SupportSession, UUID> {
    // These will need to be updated to use appointment.client and appointment.provider
    // List<SupportSession> findByClient(User client); 
    // List<SupportSession> findByProvider(User provider);
    
    // This needs to be updated to use appointment.startTime
    // List<SupportSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    // This needs to be updated to use appointment.status
    // List<SupportSession> findByStatus(String status);

    // This custom query needs to be updated due to schema changes
    @Query("""
        SELECT NEW com.lunara.api.appointment.dto.SupportSessionDTO(
            s.id,
            a.client.id,
            a.provider.id,
            a.startTime,
            a.endTime,
            a.status,
            s.approvalStatus,
            s.sessionType,
            a.notes,
            s.recommendations,
            s.resourcesProvided,
            s.followUpRequired,
            s.followUpDate,
            s.followUpNotes,
            s.cancellationReason,
            s.location,
            CONCAT(a.client.firstName, ' ', a.client.lastName),
            CONCAT(a.provider.firstName, ' ', a.provider.lastName)
        )
        FROM SupportSession s JOIN s.appointment a
        WHERE (a.client.id = :userId OR a.provider.id = :userId)
        AND a.startTime >= :startDate
        AND a.startTime < :endDate
        ORDER BY a.startTime
    """)
    List<SupportSessionDTO> findUserSupportSessionsInRange(UUID userId, LocalDateTime startDate, LocalDateTime endDate);

    // This custom query also needs to be updated (conflicts are now on AppointmentRepository)
    // @Query("""
    //     SELECT COUNT(s) > 0
    //     FROM SupportSession s JOIN s.appointment a
    //     WHERE a.provider.id = :providerId
    //     AND a.status != 'CANCELLED' // Check appointment status
    //     AND (
    //         (a.startTime <= :startTime AND a.endTime > :startTime)
    //         OR (a.startTime < :endTime AND a.endTime >= :endTime)
    //         OR (a.startTime >= :startTime AND a.endTime <= :endTime)
    //     )
    // """)
    // boolean hasConflictingSupportSessions(UUID providerId, LocalDateTime startTime, LocalDateTime endTime);

    List<SupportSession> findByAppointment_StartTimeBetween(LocalDateTime start, LocalDateTime end);

    // TODO: Review and update all other queries in this repository to align with the
    // new Appointment/SupportSession relationship (e.g., querying by client/provider ID
    // will now need to go through `appointment.client.id` or `appointment.provider.id`)
} 