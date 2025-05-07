package com.lunara.api.repository;

import com.lunara.api.availability.ProviderAvailability;
import com.lunara.api.appointment.dto.ProviderAvailabilityDTO;
import com.lunara.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderAvailabilityRepository extends JpaRepository<ProviderAvailability, Long> {
    List<ProviderAvailability> findByProvider(User provider);
    Optional<ProviderAvailability> findByProviderAndDayOfWeek(User provider, Integer dayOfWeek);
    boolean existsByProviderAndDayOfWeek(User provider, Integer dayOfWeek);

    @Query(value = """
        SELECT 
            pa.provider_id as providerId,
            CONCAT(u.first_name, ' ', u.last_name) as providerName,
            pa.day_of_week as dayOfWeek,
            pa.start_time as startTime,
            pa.end_time as endTime,
            pa.is_available as isAvailable
        FROM provider_availability pa
        JOIN _user u ON pa.provider_id = u.id
        WHERE pa.provider_id = :providerId
        AND pa.is_available = true
        AND pa.day_of_week BETWEEN 
            EXTRACT(DOW FROM CAST(:startDate AS date))
            AND EXTRACT(DOW FROM CAST(:endDate AS date))
        ORDER BY pa.day_of_week, pa.start_time
    """, nativeQuery = true)
    List<ProviderAvailabilityDTO> findAvailabilityInRange(Long providerId, LocalDateTime startDate, LocalDateTime endDate);

    Optional<ProviderAvailability> findByProviderIdAndDayOfWeek(Long providerId, Integer dayOfWeek);
} 