package com.lunara.api.controller;

import com.lunara.api.dto.CreateProviderRequest;
import com.lunara.api.dto.ProviderDTO;
import com.lunara.api.user.Provider;
import com.lunara.api.user.Role;
import com.lunara.api.service.ProviderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/providers")
@RequiredArgsConstructor
public class ProviderController {

    private final ProviderService providerService;

    @PostMapping
    public ResponseEntity<ProviderDTO> createProvider(@Valid @RequestBody CreateProviderRequest request) {
        Provider provider = new Provider();
        provider.setFirstName(request.getName());
        provider.setEmail(request.getEmail());
        provider.setPassword(request.getPassword());
        provider.setRole(Role.PROVIDER);
        
        Provider savedProvider = providerService.createProvider(provider);
        return ResponseEntity.ok(toDTO(savedProvider));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderDTO> getProvider(@PathVariable UUID id) {
        return providerService.findById(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ProviderDTO>> getAllProviders() {
        List<ProviderDTO> providers = providerService.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(providers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProviderDTO> updateProvider(@PathVariable UUID id, @Valid @RequestBody CreateProviderRequest request) {
        return providerService.findById(id)
                .map(provider -> {
                    provider.setFirstName(request.getName());
                    provider.setEmail(request.getEmail());
                    if (request.getPassword() != null && !request.getPassword().isEmpty()) {
                        provider.setPassword(request.getPassword());
                    }
                    return ResponseEntity.ok(toDTO(providerService.updateProvider(provider)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProvider(@PathVariable UUID id) {
        providerService.deleteProvider(id);
        return ResponseEntity.noContent().build();
    }

    private ProviderDTO toDTO(Provider provider) {
        ProviderDTO dto = new ProviderDTO();
        dto.setId(provider.getId());
        dto.setName(provider.getFirstName());
        dto.setEmail(provider.getEmail());
        dto.setRole(provider.getRole());
        dto.setLastLogin(provider.getLastLogin());
        dto.setCreatedAt(provider.getCreatedAt());
        dto.setUpdatedAt(provider.getUpdatedAt());
        return dto;
    }
} 