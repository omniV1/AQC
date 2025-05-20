package com.lunara.api.repository;

import com.lunara.api.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    List<Appointment> findByClientId(UUID clientId);
    List<Appointment> findByProviderId(UUID providerId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Appointment a WHERE a.provider.id = :providerId " +
           "AND ((a.startTime < :endTime AND a.endTime > :startTime)) " +
           "AND (:excludeAppointmentId IS NULL OR a.id <> :excludeAppointmentId)")
    boolean hasConflictingAppointments(
        @Param("providerId") UUID providerId,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime,
        @Param("excludeAppointmentId") UUID excludeAppointmentId
    );

    // Add other query methods as needed, e.g., find by date range, status etc.
    List<Appointment> findByProviderIdAndStartTimeBetween(UUID providerId, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByClientIdAndStartTimeBetween(UUID clientId, LocalDateTime start, LocalDateTime end);

} 