package com.lunara.api.checkin;

import com.lunara.api.user.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Entity representing a daily wellness check-in.
 * Records user's mood, physical symptoms, and other wellness metrics.
 * Used for tracking postpartum mental health and identifying potential concerns.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "daily_checkins")
public class DailyCheckIn {
    
    /** Unique identifier for the check-in */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /** Client who submitted the check-in */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    /** Current mood level (e.g., VERY_LOW, LOW, NEUTRAL, GOOD, EXCELLENT) */
    @Column(name = "mood_level", nullable = false, length = 50)
    private String moodLevel;

    /** Hours of sleep in the last 24 hours */
    @Column(name = "sleep_hours")
    private Integer sleepHours;

    /** Description of any physical symptoms or discomfort */
    @Column(name = "physical_symptoms", columnDefinition = "TEXT")
    private String physicalSymptoms;

    /** Notes about emotional state and feelings */
    @Column(name = "emotional_notes", columnDefinition = "TEXT")
    private String emotionalNotes;

    /** Description of support or resources needed */
    @Column(name = "took_medication")
    private Boolean tookMedication;

    /** Type of support needed */
    @Column(name = "medication_notes", columnDefinition = "TEXT")
    private String medicationNotes;

    /** Description of support or resources needed */
    @Column(name = "support_needed", columnDefinition = "TEXT")
    private String supportNeeded;

    /** Notes about the check-in */
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    /** Timestamp when check-in was submitted */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /** Timestamp when check-in was last updated */
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
} 