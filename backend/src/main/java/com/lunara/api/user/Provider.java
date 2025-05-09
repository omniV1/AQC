package com.lunara.api.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "providers")
@PrimaryKeyJoinColumn(name = "user_id")
public class Provider extends User {
    
    @Column(name = "specialties")
    @ElementCollection
    @CollectionTable(name = "provider_specialties", joinColumns = @JoinColumn(name = "provider_id"))
    private Set<String> specialties = new HashSet<>();
    
    @Column(length = 1000)
    private String bio;
    
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    private Set<Client> clients = new HashSet<>();
    
    @ElementCollection
    @CollectionTable(name = "provider_availability", joinColumns = @JoinColumn(name = "provider_id"))
    private Set<AvailabilitySlot> availability = new HashSet<>();
} 