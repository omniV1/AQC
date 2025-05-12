package com.lunara.api.dto;

import com.lunara.api.user.Role;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ProviderDTO {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 