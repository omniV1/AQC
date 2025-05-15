package com.lunara.api.availability;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderAvailabilityId implements Serializable {
    private UUID provider; // Maps to provider.id
    private Integer dayOfWeek;
    private LocalTime startTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProviderAvailabilityId that = (ProviderAvailabilityId) o;
        return provider.equals(that.provider) &&
               dayOfWeek.equals(that.dayOfWeek) &&
               startTime.equals(that.startTime);
    }

    @Override
    public int hashCode() {
        int result = provider.hashCode();
        result = 31 * result + dayOfWeek.hashCode();
        result = 31 * result + startTime.hashCode();
        return result;
    }
} 