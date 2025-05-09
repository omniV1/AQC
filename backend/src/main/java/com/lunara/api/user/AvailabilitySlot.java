package com.lunara.api.user;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class AvailabilitySlot {
    @Column(name = "day_of_week")
    private Integer dayOfWeek;
    
    @Column(name = "start_time")
    private String startTime;
    
    @Column(name = "end_time")
    private String endTime;
} 