package com.lunara.api.appointment.dto;

import com.lunara.api.appointment.ApprovalStatus;
import com.lunara.api.appointment.SupportSession;
import com.lunara.api.appointment.SupportSessionType;
import com.lunara.api.appointment.Appointment;
import com.lunara.api.user.User;
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
    private String status;
    private ApprovalStatus approvalStatus;
    private SupportSessionType sessionType;
    private String notes;
    private String recommendations;
    private String resourcesProvided;
    private Boolean followUpRequired;
    private LocalDateTime followUpDate;
    private String followUpNotes;
    private String cancellationReason;
    private String location;
    private String clientName;
    private String providerName;

    public static SupportSessionDTO fromEntity(SupportSession session) {
        if (session == null || session.getAppointment() == null) {
            throw new IllegalArgumentException("SupportSession and its associated Appointment must not be null.");
        }
        Appointment appointment = session.getAppointment();
        User clientUser = appointment.getClient();
        User providerUser = appointment.getProvider();

        String currentClientName = null;
        if (clientUser != null) {
            currentClientName = clientUser.getFirstName() + " " + clientUser.getLastName();
        }

        String currentProviderName = null;
        if (providerUser != null) {
            currentProviderName = providerUser.getFirstName() + " " + providerUser.getLastName();
        }

        return SupportSessionDTO.builder()
                .id(session.getId())
                .clientId(appointment.getClient() != null ? appointment.getClient().getId() : null)
                .providerId(appointment.getProvider() != null ? appointment.getProvider().getId() : null)
                .startTime(appointment.getStartTime())
                .endTime(appointment.getEndTime())
                .status(appointment.getStatus())
                .notes(appointment.getNotes())
                .clientName(currentClientName)
                .providerName(currentProviderName)
                .approvalStatus(session.getApprovalStatus())
                .sessionType(session.getSessionType())
                .recommendations(session.getRecommendations())
                .resourcesProvided(session.getResourcesProvided())
                .followUpRequired(session.getFollowUpRequired())
                .followUpDate(session.getFollowUpDate())
                .followUpNotes(session.getFollowUpNotes())
                .cancellationReason(session.getCancellationReason())
                .location(session.getLocation())
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
            public final String status = SupportSessionDTO.this.status;
            public final String approvalStatus = SupportSessionDTO.this.approvalStatus != null ? SupportSessionDTO.this.approvalStatus.name() : null;
            public final String sessionType = SupportSessionDTO.this.sessionType != null ? SupportSessionDTO.this.sessionType.name() : null;
            public final String notes = SupportSessionDTO.this.notes;
            public final String recommendations = SupportSessionDTO.this.recommendations;
            public final String resourcesProvided = SupportSessionDTO.this.resourcesProvided;
            public final Boolean followUpRequired = SupportSessionDTO.this.followUpRequired;
            public final LocalDateTime followUpDate = SupportSessionDTO.this.followUpDate;
            public final String followUpNotes = SupportSessionDTO.this.followUpNotes;
            public final String cancellationReason = SupportSessionDTO.this.cancellationReason;
            public final String location = SupportSessionDTO.this.location;
        };
    }
} 