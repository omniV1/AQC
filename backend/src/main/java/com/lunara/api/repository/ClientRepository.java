package com.lunara.api.repository;

import com.lunara.api.user.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<Client> findByEmail(String email);
    List<Client> findByProviderId(UUID providerId);
    boolean existsByEmail(String email);
} 