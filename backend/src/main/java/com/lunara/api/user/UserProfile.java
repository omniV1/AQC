package com.lunara.api.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate dueDate;
    private LocalDate birthDate;
    
    @Enumerated(EnumType.STRING)
    private BirthType birthType;
    
    @Enumerated(EnumType.STRING)
    private FeedingStyle feedingStyle;
    
    private String birthLocation;
    private String supportSystem;
    private String concerns;
    private String goals;
    
    @Column(name = "created_at")
    private LocalDate createdAt;
    
    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
        updatedAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDate.now();
    }
} 