package com.lunara.api.service;

import com.lunara.api.model.Provider;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProviderService {
    Provider createProvider(Provider provider);
    Optional<Provider> getProviderById(UUID id);
    Optional<Provider> getProviderByEmail(String email);
    List<Provider> getAllProviders();
    Provider updateProvider(Provider provider);
    void deleteProvider(UUID id);
    boolean existsByEmail(String email);
} 