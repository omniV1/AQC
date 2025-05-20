package com.lunara.api.blog;

import com.lunara.api.blog.dto.BlogPostDto;
import com.lunara.api.blog.dto.CreateBlogPostRequest;
import com.lunara.api.blog.dto.UpdateBlogPostRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/blog") // Base path for all blog-related endpoints
@RequiredArgsConstructor
public class BlogPostController {

    private final BlogPostService blogPostService;

    // --- Publicly Accessible Endpoints ---

    @GetMapping
    public ResponseEntity<Page<BlogPostDto>> getAllPublishedPosts(@PageableDefault(size = 10, sort = "publishedAt") Pageable pageable) {
        return ResponseEntity.ok(blogPostService.getAllPublishedPosts(pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDto> getPublishedPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogPostService.getPublishedPostBySlug(slug));
    }
    
    // --- Admin/Provider/Author Accessible Endpoints ---

    // Endpoint for an admin or author to get any post by ID (handles auth internally for unpublished)
    @GetMapping("/post/{id}") 
    @PreAuthorize("isAuthenticated()") // Basic auth check, service layer handles finer grain for unpublished
    public ResponseEntity<BlogPostDto> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(blogPostService.getPostById(id));
    }

    // --- Authenticated Endpoints for Admins and Providers ---

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PROVIDER')")
    public ResponseEntity<BlogPostDto> createPost(@Valid @RequestBody CreateBlogPostRequest request) {
        BlogPostDto createdPost = blogPostService.createPost(request);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PROVIDER')") // Service layer further ensures only author or admin can update
    public ResponseEntity<BlogPostDto> updatePost(@PathVariable Long id, @Valid @RequestBody UpdateBlogPostRequest request) {
        BlogPostDto updatedPost = blogPostService.updatePost(id, request);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PROVIDER')") // Service layer further ensures only author or admin can delete
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // --- Endpoints for the current user (Provider or Admin) to see their own posts ---
    @GetMapping("/my-posts")
    @PreAuthorize("hasAnyRole('ADMIN', 'PROVIDER')")
    public ResponseEntity<Page<BlogPostDto>> getMyPosts(@PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(blogPostService.getPostsByCurrentUser(pageable));
    }
    
    // --- Endpoint specifically for Admins to see all posts (published or not) ---
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<BlogPostDto>> getAllPostsForAdmin(@PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(blogPostService.getAllPostsForAdmin(pageable));
    }
} 