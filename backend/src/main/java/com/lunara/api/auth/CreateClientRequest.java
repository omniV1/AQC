package com.lunara.api.auth;

import com.lunara.api.user.BirthType;
import com.lunara.api.user.FeedingStyle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateClientRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    
    // Profile information
    private LocalDate dueDate;
    private LocalDate birthDate;
    private BirthType birthType;
    private FeedingStyle feedingStyle;
    private String birthLocation;
    private String supportSystem;
    private String concerns;
    private String goals;
} 