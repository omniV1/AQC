package com.lunara.api.blog;

import com.lunara.api.blog.dto.BlogPostDto;
import com.lunara.api.blog.dto.CreateBlogPostRequest;
import com.lunara.api.blog.dto.UpdateBlogPostRequest;
import com.lunara.api.user.User;
import com.lunara.api.repository.UserRepository; // Corrected import
import com.lunara.api.exception.ResourceNotFoundException; // Correct import
import com.lunara.api.exception.UnauthorizedException; // Correct import
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.github.slugify.Slugify; // For slug generation

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository; // Made final
    private final Slugify slugify = Slugify.builder().build();

    @Transactional
    public BlogPostDto createPost(CreateBlogPostRequest request) {
        User currentUser = getCurrentUser();

        BlogPost blogPost = BlogPost.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(currentUser)
                .slug(generateUniqueSlug(request.getSlug(), request.getTitle()))
                .published(request.isPublished())
                .build();

        if (request.isPublished()) {
            blogPost.setPublishedAt(LocalDateTime.now());
        }

        BlogPost savedPost = blogPostRepository.save(blogPost);
        return mapToDto(savedPost);
    }

    @Transactional(readOnly = true)
    public Page<BlogPostDto> getAllPublishedPosts(Pageable pageable) {
        return blogPostRepository.findByPublished(true, pageable).map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public BlogPostDto getPublishedPostBySlug(String slug) {
        return blogPostRepository.findBySlugAndPublished(slug, true)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "slug", slug));
    }
    
    @Transactional(readOnly = true)
    public BlogPostDto getPostById(Long id) {
        User currentUser = getCurrentUser();
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "id", id.toString()));

        // Allow ADMIN to view any post, PROVIDER to view their own (published or unpublished)
        // Allow any user to see any PUBLISHED post
        if (post.isPublished()) {
            return mapToDto(post);
        }

        // If not published, only author or ADMIN can view
        if (!currentUser.getRole().name().equals("ADMIN") && !post.getAuthor().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("BlogPost", "id", id.toString()); // Or UnauthorizedException
        }
        return mapToDto(post);
    }


    @Transactional(readOnly = true)
    public Page<BlogPostDto> getPostsByCurrentUser(Pageable pageable) {
        User currentUser = getCurrentUser();
        return blogPostRepository.findByAuthorId(currentUser.getId(), pageable).map(this::mapToDto);
    }
    
    @Transactional(readOnly = true)
    public Page<BlogPostDto> getAllPostsForAdmin(Pageable pageable) {
        // This method should only be callable by ADMINs, enforced at controller level
        return blogPostRepository.findAll(pageable).map(this::mapToDto);
    }


    @Transactional
    public BlogPostDto updatePost(Long id, UpdateBlogPostRequest request) {
        User currentUser = getCurrentUser();
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "id", id.toString()));

        // Only author or ADMIN can update
        if (!blogPost.getAuthor().getId().equals(currentUser.getId()) && !currentUser.getRole().name().equals("ADMIN")) {
            throw new UnauthorizedException("User not authorized to update this post");
        }

        if (request.getTitle() != null) {
            blogPost.setTitle(request.getTitle());
            if (request.getSlug() == null || request.getSlug().isBlank()) {
                blogPost.setSlug(generateUniqueSlug(null, request.getTitle(), blogPost.getId()));
            }
        }
        if (request.getContent() != null) {
            blogPost.setContent(request.getContent());
        }
        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            if (!blogPost.getSlug().equals(request.getSlug())) {
                 blogPost.setSlug(generateUniqueSlug(request.getSlug(), null, blogPost.getId()));
            }
        }
        if (request.getPublished() != null) {
            if (blogPost.isPublished() != request.getPublished()) {
                blogPost.setPublished(request.getPublished());
                blogPost.setPublishedAt(request.getPublished() ? LocalDateTime.now() : null);
            }
        }

        BlogPost updatedPost = blogPostRepository.save(blogPost);
        return mapToDto(updatedPost);
    }

    @Transactional
    public void deletePost(Long id) {
        User currentUser = getCurrentUser();
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "id", id.toString()));

        if (!blogPost.getAuthor().getId().equals(currentUser.getId()) && !currentUser.getRole().name().equals("ADMIN")) {
            throw new UnauthorizedException("User not authorized to delete this post");
        }
        blogPostRepository.delete(blogPost);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new UnauthorizedException("User not authenticated");
        }
        String userEmail = authentication.getName();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
    }

    private String generateUniqueSlug(String requestedSlug, String title) {
        return generateUniqueSlug(requestedSlug, title, null);
    }
    
    private String generateUniqueSlug(String requestedSlug, String title, Long existingPostId) {
        String baseSlug;
        if (requestedSlug != null && !requestedSlug.isBlank()) {
            baseSlug = slugify.slugify(requestedSlug);
        } else if (title != null && !title.isBlank()) {
            baseSlug = slugify.slugify(title);
        } else {
            throw new IllegalArgumentException("Either slug or title must be provided to generate a slug.");
        }

        String currentSlug = baseSlug;
        int counter = 1;
        while (true) {
            Optional<BlogPost> postOpt = blogPostRepository.findBySlug(currentSlug);
            if (postOpt.isEmpty() || (existingPostId != null && postOpt.get().getId().equals(existingPostId))) {
                return currentSlug;
            }
            currentSlug = baseSlug + "-" + counter++;
        }
    }

    private BlogPostDto mapToDto(BlogPost blogPost) {
        return BlogPostDto.builder()
                .id(blogPost.getId())
                .title(blogPost.getTitle())
                .content(blogPost.getContent())
                .slug(blogPost.getSlug())
                .authorId(blogPost.getAuthor().getId())
                .authorFirstName(blogPost.getAuthor().getFirstName())
                .authorLastName(blogPost.getAuthor().getLastName())
                .published(blogPost.isPublished())
                .createdAt(blogPost.getCreatedAt())
                .updatedAt(blogPost.getUpdatedAt())
                .publishedAt(blogPost.getPublishedAt())
                .build();
    }
} 