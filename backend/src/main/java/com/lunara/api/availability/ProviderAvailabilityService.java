package com.lunara.api.availability;

import com.lunara.api.repository.ProviderAvailabilityRepository;
import com.lunara.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderAvailabilityService {
    private final ProviderAvailabilityRepository availabilityRepository;

    @Transactional(readOnly = true)
    public List<ProviderAvailability> getProviderAvailability(User provider) {
        return availabilityRepository.findByProvider(provider);
    }

    @Transactional
    public ProviderAvailability setAvailability(User provider, Integer dayOfWeek, LocalTime startTime, LocalTime endTime, Boolean isAvailable) {
        validateTimeRange(startTime, endTime);
        
        ProviderAvailability availability = availabilityRepository
            .findByProviderAndDayOfWeek(provider, dayOfWeek)
            .orElse(ProviderAvailability.builder()
                .provider(provider)
                .dayOfWeek(dayOfWeek)
                .build());

        availability.setStartTime(startTime);
        availability.setEndTime(endTime);
        availability.setIsAvailable(isAvailable);

        return availabilityRepository.save(availability);
    }

    @Transactional(readOnly = true)
    public boolean isProviderAvailable(User provider, Integer dayOfWeek, LocalTime time) {
        return availabilityRepository
            .findByProviderAndDayOfWeek(provider, dayOfWeek)
            .map(availability -> 
                availability.getIsAvailable() &&
                !time.isBefore(availability.getStartTime()) &&
                !time.isAfter(availability.getEndTime())
            )
            .orElse(false);
    }

    private void validateTimeRange(LocalTime startTime, LocalTime endTime) {
        if (endTime.isBefore(startTime)) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        // Ensure minimum availability window (e.g., 30 minutes)
        if (startTime.plusMinutes(30).isAfter(endTime)) {
            throw new IllegalArgumentException("Availability window must be at least 30 minutes");
        }
    }
} 