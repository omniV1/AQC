package com.lunara.api.controller;

import com.lunara.api.user.Client;
import com.lunara.api.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.user.User;

import java.util.UUID;

@RestController
@RequestMapping("/api/users/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<Page<Client>> getClients(@AuthenticationPrincipal User provider, Pageable pageable) {
        return ResponseEntity.ok(clientService.getClientsByProvider(provider.getId(), pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<Client> getClient(@AuthenticationPrincipal User provider, @PathVariable UUID id) {
        return clientService.getClientByIdAndProvider(id, provider.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 