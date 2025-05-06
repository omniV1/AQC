package com.lunara.api.error;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Standardized error response format for the API.
 * Used to provide consistent error information across all endpoints.
 */
@Data
@Builder
@Schema(description = "Standard error response")
public class ErrorResponse {
    
    @Schema(description = "HTTP status code", example = "400")
    private int status;

    @Schema(description = "Error type", example = "Bad Request")
    private String error;

    @Schema(description = "Detailed error message", example = "Email address is already registered")
    private String message;

    @Schema(description = "Path where the error occurred", example = "/api/v1/auth/register")
    private String path;

    @Schema(description = "Timestamp when the error occurred")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime timestamp;

    public static ErrorResponse of(int status, String error, String message, String path) {
        return ErrorResponse.builder()
                .status(status)
                .error(error)
                .message(message)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
    }
} 