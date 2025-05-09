package com.lunara.api.appointment.dto;

import com.lunara.api.appointment.ApprovalStatus;
import com.lunara.api.appointment.SupportSession;
import com.lunara.api.appointment.SupportSessionStatus;
import com.lunara.api.appointment.SupportSessionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportSessionDTO {
    private UUID id;
    private UUID clientId;
    private UUID providerId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private SupportSessionStatus status;
    private ApprovalStatus approvalStatus;
    private SupportSessionType sessionType;
    private String notes;
    private String followUpNotes;
    private String cancellationReason;
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
                .approvalStatus(session.getApprovalStatus())
                .sessionType(session.getSessionType())
                .notes(session.getNotes())
                .followUpNotes(session.getFollowUpNotes())
                .cancellationReason(session.getCancellationReason())
                .location(session.getLocation())
                .clientName(session.getClient().getFirstName() + " " + session.getClient().getLastName())
                .providerName(session.getProvider().getFirstName() + " " + session.getProvider().getLastName())
                .build();
    }

    public Object toFrontendFormat() {
        return new Object() {
            public final UUID id = SupportSessionDTO.this.id;
            public final Object provider = new Object() {
                public final UUID id = SupportSessionDTO.this.providerId;
                public final String name = SupportSessionDTO.this.providerName;
            };
            public final Object client = new Object() {
                public final UUID id = SupportSessionDTO.this.clientId;
                public final String name = SupportSessionDTO.this.clientName;
            };
            public final LocalDateTime startTime = SupportSessionDTO.this.startTime;
            public final LocalDateTime endTime = SupportSessionDTO.this.endTime;
            public final String status = SupportSessionDTO.this.status.name();
            public final String approvalStatus = SupportSessionDTO.this.approvalStatus.name();
            public final String sessionType = SupportSessionDTO.this.sessionType.name();
            public final String notes = SupportSessionDTO.this.notes;
            public final String followUpNotes = SupportSessionDTO.this.followUpNotes;
            public final String cancellationReason = SupportSessionDTO.this.cancellationReason;
            public final String location = SupportSessionDTO.this.location;
        };
    }
} 