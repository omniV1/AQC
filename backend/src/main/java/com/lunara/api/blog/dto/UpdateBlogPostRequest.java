package com.lunara.api.blog.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBlogPostRequest {

    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    private String content;

    @Size(max = 255, message = "Slug cannot exceed 255 characters")
    private String slug;

    private Boolean published;
} 