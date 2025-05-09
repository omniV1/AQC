package com.lunara.api.repository;

import com.lunara.api.appointment.SupportSession;
import com.lunara.api.appointment.dto.SupportSessionDTO;
import com.lunara.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface SupportSessionRepository extends JpaRepository<SupportSession, UUID> {
    List<SupportSession> findByClient(User client);
    List<SupportSession> findByProvider(User provider);
    List<SupportSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<SupportSession> findByStatus(String status);

    @Query("""
        SELECT NEW com.lunara.api.appointment.dto.SupportSessionDTO(
            s.id, 
            s.client.id, 
            s.provider.id, 
            s.startTime, 
            s.endTime, 
            s.status, 
            s.notes, 
            s.location, 
            CONCAT(s.client.firstName, ' ', s.client.lastName) as clientName,
            CONCAT(s.provider.firstName, ' ', s.provider.lastName) as providerName
        )
        FROM SupportSession s
        WHERE (s.client.id = :userId OR s.provider.id = :userId)
        AND s.startTime >= :startDate
        AND s.startTime < :endDate
        ORDER BY s.startTime
    """)
    List<SupportSessionDTO> findUserSupportSessionsInRange(UUID userId, LocalDateTime startDate, LocalDateTime endDate);

    @Query("""
        SELECT COUNT(s) > 0
        FROM SupportSession s
        WHERE s.provider.id = :providerId
        AND s.status != 'CANCELLED'
        AND (
            (s.startTime <= :startTime AND s.endTime > :startTime)
            OR (s.startTime < :endTime AND s.endTime >= :endTime)
            OR (s.startTime >= :startTime AND s.endTime <= :endTime)
        )
    """)
    boolean hasConflictingSupportSessions(UUID providerId, LocalDateTime startTime, LocalDateTime endTime);
} 