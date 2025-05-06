package com.lunara.api.checkin;

import com.lunara.api.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** User who submitted the check-in */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /** Current mood level (e.g., VERY_LOW, LOW, NEUTRAL, GOOD, EXCELLENT) */
    @Enumerated(EnumType.STRING)
    private MoodLevel moodLevel;

    /** Description of any physical symptoms or discomfort */
    private String physicalSymptoms;
    
    /** Notes about emotional state and feelings */
    private String emotionalNotes;
    
    /** Hours of sleep in the last 24 hours */
    private Integer sleepHours;
    
    /** Whether prescribed medications were taken */
    private Boolean tookMedication;
    
    /** Notes about medication adherence or side effects */
    private String medicationNotes;
    
    /** Description of support or resources needed */
    private String supportNeeded;
    
    /** Timestamp when check-in was submitted */
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    /** Sets creation timestamp before persisting */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 