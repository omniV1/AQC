package com.lunara.api.service;

import com.lunara.api.user.Client;
import com.lunara.api.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Transactional(readOnly = true)
    public Page<Client> getClients(Pageable pageable) {
        return clientRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Client> getClientById(UUID id) {
        return clientRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Page<Client> getClientsByProvider(UUID providerId, Pageable pageable) {
        return clientRepository.findByProviderId(providerId, pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Client> getClientByIdAndProvider(UUID clientId, UUID providerId) {
        return clientRepository.findByIdAndProviderId(clientId, providerId);
    }

    @Transactional
    public Client createClient(Client client) {
        if (clientRepository.existsByEmail(client.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Ensure provider relationship is properly set
        if (client.getProvider() != null) {
            client.getProvider().addClient(client);
        }
        
        return clientRepository.save(client);
    }

    @Transactional
    public Client updateClient(Client client) {
        var existingClient = clientRepository.findById(client.getId())
            .orElseThrow(() -> new RuntimeException("Client not found"));
        
        // Handle provider change if necessary
        if (existingClient.getProvider() != client.getProvider()) {
            if (existingClient.getProvider() != null) {
                existingClient.getProvider().removeClient(existingClient);
            }
            if (client.getProvider() != null) {
                client.getProvider().addClient(client);
            }
        }
        
        return clientRepository.save(client);
    }

    @Transactional
    public void deleteClient(UUID id) {
        var client = clientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Client not found"));
        
        if (client.getProvider() != null) {
            client.getProvider().removeClient(client);
        }
        
        clientRepository.deleteById(id);
    }
} 