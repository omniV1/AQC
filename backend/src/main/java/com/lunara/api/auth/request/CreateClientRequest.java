package com.lunara.api.auth.request;

import com.lunara.api.user.BirthType;
import com.lunara.api.user.FeedingStyle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateClientRequest {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    
    // Profile information
    private String dueDate;
    private String birthDate;
    private BirthType birthType;
    private FeedingStyle feedingStyle;
    private String birthLocation;
    private String supportSystem;
    private String concerns;
    private String goals;
} 