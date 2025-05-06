package com.lunara.api.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Error response structure")
public class ErrorResponse {
    
    @Schema(description = "Error message describing what went wrong", 
            example = "Email already exists")
    private String message;
    
    @Schema(description = "Error code identifying the type of error", 
            example = "INVALID_CREDENTIALS")
    private String code;
    
    @Schema(description = "Timestamp when the error occurred", 
            example = "2024-05-06T11:45:38.123Z")
    private String timestamp;
} 