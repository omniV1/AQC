package com.lunara.api.service.impl;

import com.lunara.api.user.Provider;
import com.lunara.api.repository.ProviderRepository;
import com.lunara.api.service.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements ProviderService {

    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Provider createProvider(Provider provider) {
        if (providerRepository.existsByEmail(provider.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        provider.setPassword(passwordEncoder.encode(provider.getPassword()));
        return providerRepository.save(provider);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Provider> findByEmail(String email) {
        return providerRepository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Provider> findById(UUID id) {
        return providerRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Provider> findAll() {
        return providerRepository.findAll();
    }

    @Override
    @Transactional
    public Provider updateProvider(Provider provider) {
        if (!providerRepository.existsById(provider.getId())) {
            throw new RuntimeException("Provider not found");
        }
        return providerRepository.save(provider);
    }

    @Override
    @Transactional
    public void deleteProvider(UUID id) {
        providerRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return providerRepository.existsByEmail(email);
    }
} 