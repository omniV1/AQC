package com.lunara.api.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_profiles", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id"})})
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime dueDate;
    private LocalDateTime birthDate;
    
    @Enumerated(EnumType.STRING)
    private BirthType birthType;
    
    @Enumerated(EnumType.STRING)
    private FeedingStyle feedingStyle;
    
    @Column(columnDefinition = "TEXT")
    private String birthLocation;
    @Column(columnDefinition = "TEXT")
    private String supportSystem;
    @Column(columnDefinition = "TEXT")
    private String concerns;
    @Column(columnDefinition = "TEXT")
    private String goals;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public BirthType getBirthType() {
        return birthType;
    }

    public void setBirthType(BirthType birthType) {
        this.birthType = birthType;
    }

    public FeedingStyle getFeedingStyle() {
        return feedingStyle;
    }

    public void setFeedingStyle(FeedingStyle feedingStyle) {
        this.feedingStyle = feedingStyle;
    }

    public String getBirthLocation() {
        return birthLocation;
    }

    public void setBirthLocation(String birthLocation) {
        this.birthLocation = birthLocation;
    }

    public String getSupportSystem() {
        return supportSystem;
    }

    public void setSupportSystem(String supportSystem) {
        this.supportSystem = supportSystem;
    }

    public String getConcerns() {
        return concerns;
    }

    public void setConcerns(String concerns) {
        this.concerns = concerns;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
} 