package com.lunara.api.service;

import com.lunara.api.user.Provider;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProviderService {
    Provider createProvider(Provider provider);
    Optional<Provider> findByEmail(String email);
    Optional<Provider> findById(UUID id);
    List<Provider> findAll();
    Provider updateProvider(Provider provider);
    void deleteProvider(UUID id);
    boolean existsByEmail(String email);
} 