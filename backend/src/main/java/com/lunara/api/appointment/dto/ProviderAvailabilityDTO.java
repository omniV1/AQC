package com.lunara.api.appointment.dto;

import java.time.LocalTime;
import java.util.UUID;

public interface ProviderAvailabilityDTO {
    UUID getProviderId();
    String getProviderName();
    Integer getDayOfWeek();
    LocalTime getStartTime();
    LocalTime getEndTime();
    Boolean getIsAvailable();
} 