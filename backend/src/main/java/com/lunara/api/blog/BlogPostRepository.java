package com.lunara.api.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    Optional<BlogPost> findBySlug(String slug);
    Page<BlogPost> findByPublished(boolean published, Pageable pageable);
    Page<BlogPost> findByAuthorIdAndPublished(UUID authorId, boolean published, Pageable pageable);
    Page<BlogPost> findByAuthorId(UUID authorId, Pageable pageable);
    Optional<BlogPost> findByIdAndAuthorId(Long id, UUID authorId);
    Optional<BlogPost> findBySlugAndPublished(String slug, boolean published);

} 