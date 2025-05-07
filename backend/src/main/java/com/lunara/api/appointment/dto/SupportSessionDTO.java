package com.lunara.api.appointment.dto;

import com.lunara.api.appointment.SupportSession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportSessionDTO {
    private Long id;
    private Long clientId;
    private Long providerId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private String notes;
    private String location;
    private String clientName;
    private String providerName;

    public static SupportSessionDTO fromEntity(SupportSession session) {
        return SupportSessionDTO.builder()
                .id(session.getId())
                .clientId(session.getClientId())
                .providerId(session.getProviderId())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .status(session.getStatus())
                .notes(session.getNotes())
                .location(session.getLocation())
                .build();
    }

    public Object toFrontendFormat() {
        return new Object() {
            public final Long id = SupportSessionDTO.this.id;
            public final Object provider = new Object() {
                public final Long id = SupportSessionDTO.this.providerId;
                public final String name = SupportSessionDTO.this.providerName;
            };
            public final Object client = new Object() {
                public final Long id = SupportSessionDTO.this.clientId;
                public final String name = SupportSessionDTO.this.clientName;
            };
            public final LocalDateTime startTime = SupportSessionDTO.this.startTime;
            public final LocalDateTime endTime = SupportSessionDTO.this.endTime;
            public final String status = SupportSessionDTO.this.status;
            public final String notes = SupportSessionDTO.this.notes;
            public final String location = SupportSessionDTO.this.location;
        };
    }
} 