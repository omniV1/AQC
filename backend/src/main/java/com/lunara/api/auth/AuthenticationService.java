package com.lunara.api.auth;

import com.lunara.api.config.SystemConfig;
import com.lunara.api.config.SystemConfigRepository;
import com.lunara.api.exception.BadRequestException;
import com.lunara.api.exception.ForbiddenException;
import com.lunara.api.security.JwtService;
import com.lunara.api.user.Role;
import com.lunara.api.user.User;
import com.lunara.api.user.UserProfile;
import com.lunara.api.repository.UserRepository;
import com.lunara.api.repository.UserProfileRepository;
import com.lunara.api.repository.ClientRepository;
import com.lunara.api.repository.ProviderRepository;
import com.lunara.api.user.Client;
import com.lunara.api.user.ClientStatus;
import com.lunara.api.user.Provider;
import com.lunara.api.auth.request.RegisterProviderRequest;
import com.lunara.api.auth.request.CreateClientRequest;
import com.lunara.api.auth.request.AuthenticationRequest;
import com.lunara.api.auth.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import org.springframework.core.env.Environment;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ProviderRepository providerRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SystemConfigRepository systemConfigRepository;
    private final Environment environment;

    @Value("${app.provider.registration.code:default123}")
    private String defaultRegistrationCode;

    private static final String PROVIDER_REGISTRATION_CODE_KEY = "provider.registration.code";

    @PostConstruct
    public void init() {
        // Initialize registration code in database if not exists
        var existingCode = systemConfigRepository.findByConfigKey(PROVIDER_REGISTRATION_CODE_KEY);
        if (existingCode.isEmpty()) {
            log.info("Initializing registration code in database with default value");
            var config = new SystemConfig();
            config.setKey(PROVIDER_REGISTRATION_CODE_KEY);
            config.setValue(defaultRegistrationCode);
            config.setDescription("Provider registration code");
            systemConfigRepository.save(config);
        }
    }

    public boolean isValidRegistrationCode(String code) {
        // In development mode, accept any code
        if (isDevelopmentMode()) {
            return true;
        }
        
        // Otherwise, check against stored code
        return systemConfigRepository
                .findByConfigKey(PROVIDER_REGISTRATION_CODE_KEY)
                .map(config -> config.getValue().equals(code))
                .orElse(defaultRegistrationCode.equals(code));
    }

    private boolean isDevelopmentMode() {
        return Arrays.asList(environment.getActiveProfiles()).contains("dev") ||
               Arrays.asList(environment.getActiveProfiles()).isEmpty();
    }

    public boolean isPasswordStrong(String password) {
        // Simplified password validation
        return password != null && password.length() >= 8;
    }

    @Transactional
    public AuthenticationResponse registerProvider(RegisterProviderRequest request) {
        if (!isValidRegistrationCode(request.getRegistrationCode())) {
            throw new ForbiddenException("Invalid registration code");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already registered");
        }

        var user = new Provider();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.PROVIDER);

        var savedUser = userRepository.save(user);
        var token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .user(savedUser)
                .build();
    }

    @Transactional
    public AuthenticationResponse registerClient(User user, CreateClientRequest request) {
        // Get the actual Provider instance from the database
        Provider provider = userRepository.findById(user.getId())
                .filter(u -> u instanceof Provider)
                .map(u -> (Provider) u)
                .orElseThrow(() -> new ForbiddenException("Only providers can register clients"));

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create a new Client instance (this will handle the inheritance)
        var client = new Client();
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPassword(passwordEncoder.encode(request.getPassword()));
        client.setRole(Role.CLIENT);
        client.setStatus(ClientStatus.ACTIVE);
        
        // Set up the bidirectional relationship
        client.setProvider(provider);
        provider.addClient(client);

        // Save both the client and provider (cascade will handle the relationship)
        var savedClient = clientRepository.save(client);
        providerRepository.save(provider);

        // Create and save the user profile
        var profile = new UserProfile();
        profile.setUser(savedClient);
        if (request.getDueDate() != null) {
            try {
                profile.setDueDate(LocalDate.parse(request.getDueDate()).atStartOfDay());
            } catch (DateTimeParseException e) {
                throw new BadRequestException("Invalid due date format. Please use YYYY-MM-DD format.");
            }
        }
        if (request.getBirthDate() != null) {
            try {
                profile.setBirthDate(LocalDate.parse(request.getBirthDate()).atStartOfDay());
            } catch (DateTimeParseException e) {
                throw new BadRequestException("Invalid birth date format. Please use YYYY-MM-DD format.");
            }
        }
        profile.setBirthType(request.getBirthType());
        profile.setFeedingStyle(request.getFeedingStyle());
        profile.setBirthLocation(request.getBirthLocation());
        profile.setSupportSystem(request.getSupportSystem());
        profile.setConcerns(request.getConcerns());
        profile.setGoals(request.getGoals());

        userProfileRepository.save(profile);

        var token = jwtService.generateToken(savedClient);
        return AuthenticationResponse.builder()
                .token(token)
                .user(savedClient)
                .build();
    }

    @Transactional(readOnly = true)
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Initialize the specialties collection if it's a Provider
        if (user instanceof Provider) {
            ((Provider) user).getSpecialties().size(); // Force initialization
        }

        var token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    public String getRegistrationCode() {
        return systemConfigRepository
                .findByConfigKey(PROVIDER_REGISTRATION_CODE_KEY)
                .map(SystemConfig::getValue)
                .orElse(defaultRegistrationCode);
    }
} 