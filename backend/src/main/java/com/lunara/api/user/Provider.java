package com.lunara.api.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lunara.api.availability.ProviderAvailability;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true, exclude = {"clients", "availability"})
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "providers")
@PrimaryKeyJoinColumn(name = "user_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Provider extends User {
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "provider_specialties", joinColumns = @JoinColumn(name = "provider_id"))
    @Column(name = "specialty")
    private Set<String> specialties = new HashSet<>();
    
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;
    
    @OneToMany(mappedBy = "provider", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Client> clients = new HashSet<>();
    
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<ProviderAvailability> availability = new HashSet<>();

    public Set<Client> getClients() {
        return clients;
    }

    public void addClient(Client client) {
        clients.add(client);
        if (client.getProvider() != this) {
            client.setProvider(this);
        }
    }

    public void removeClient(Client client) {
        clients.remove(client);
        if (client.getProvider() == this) {
            client.setProvider(null);
        }
    }
} 