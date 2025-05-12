package com.lunara.api.config;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "system_config")
public class SystemConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "config_key", nullable = false, unique = true)
    private String configKey;

    @Column(name = "config_value", nullable = false)
    private String configValue;

    @Column(name = "description")
    private String description;

    // Add explicit getters and setters for better compatibility
    public String getValue() {
        return configValue;
    }

    public void setValue(String value) {
        this.configValue = value;
    }

    public String getKey() {
        return configKey;
    }

    public void setKey(String key) {
        this.configKey = key;
    }
} 