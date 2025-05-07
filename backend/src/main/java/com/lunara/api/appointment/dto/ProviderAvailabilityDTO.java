package com.lunara.api.appointment.dto;

import java.time.LocalTime;

public interface ProviderAvailabilityDTO {
    Long getProviderId();
    String getProviderName();
    Integer getDayOfWeek();
    LocalTime getStartTime();
    LocalTime getEndTime();
    Boolean getIsAvailable();
} 