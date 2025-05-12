package com.lunara.api.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunara.api.config.SystemConfig;
import com.lunara.api.config.SystemConfigRepository;
import com.lunara.api.exception.BadRequestException;
import com.lunara.api.exception.ForbiddenException;
import com.lunara.api.security.JwtService;
import com.lunara.api.user.Role;
import com.lunara.api.user.User;
import com.lunara.api.repository.UserRepository;
import com.lunara.api.repository.ClientRepository;
import com.lunara.api.repository.ProviderRepository;
import com.lunara.api.user.Client;
import com.lunara.api.user.ClientStatus;
import com.lunara.api.user.Provider;
import com.lunara.api.auth.request.RegisterProviderRequest;
import com.lunara.api.auth.request.CreateClientRequest;
import com.lunara.api.auth.request.AuthenticationRequest;
import com.lunara.api.auth.response.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private static final String PROVIDER_REGISTRATION_CODE_KEY = "provider.registration.code";

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SystemConfigRepository systemConfigRepository;
    private final ObjectMapper objectMapper;
    private final Environment environment;

    @Value("${app.registration.provider-code:default123}")
    private String defaultRegistrationCode;

    @Autowired
    public AuthenticationService(
            UserRepository userRepository,
            ClientRepository clientRepository,
            ProviderRepository providerRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            SystemConfigRepository systemConfigRepository,
            ObjectMapper objectMapper,
            Environment environment) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.providerRepository = providerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.systemConfigRepository = systemConfigRepository;
        this.objectMapper = objectMapper;
        this.environment = environment;
    }

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
        return systemConfigRepository
                .findByConfigKey(PROVIDER_REGISTRATION_CODE_KEY)
                .map(config -> config.getValue().equals(code))
                .orElse(defaultRegistrationCode.equals(code));
    }

    private boolean isDevelopmentMode() {
        return Arrays.asList(environment.getActiveProfiles()).contains("dev") ||
               Arrays.asList(environment.getActiveProfiles()).isEmpty();
    }

    public String getRegistrationCode() {
        if (!isDevelopmentMode()) {
            throw new ForbiddenException("Registration code can only be retrieved in development mode");
        }
        return systemConfigRepository
                .findByConfigKey(PROVIDER_REGISTRATION_CODE_KEY)
                .map(SystemConfig::getValue)
                .orElse(defaultRegistrationCode);
    }

    public boolean isPasswordStrong(String password) {
        return password != null && password.length() >= 8;
    }

    @Transactional
    public AuthenticationResponse registerProvider(RegisterProviderRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var provider = new Provider();
        provider.setFirstName(request.getFirstName());
        provider.setLastName(request.getLastName());
        provider.setEmail(request.getEmail());
        provider.setPassword(passwordEncoder.encode(request.getPassword()));
        provider.setRole(Role.PROVIDER);

        var savedProvider = providerRepository.save(provider);
        var jwtToken = jwtService.generateToken(savedProvider);
        return AuthenticationResponse.create(jwtToken, savedProvider);
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
        
        // Create preferences JSON
        var preferences = new HashMap<String, Object>();
        preferences.put("birthType", request.getBirthType() != null ? request.getBirthType().name() : null);
        preferences.put("feedingStyle", request.getFeedingStyle() != null ? request.getFeedingStyle().name() : null);
        preferences.put("birthLocation", request.getBirthLocation());
        preferences.put("supportSystem", request.getSupportSystem());
        preferences.put("concerns", request.getConcerns());
        preferences.put("goals", request.getGoals());
        
        // Convert preferences to JSON object for JSONB storage
        try {
            String jsonStr = objectMapper.writeValueAsString(preferences);
            client.setPreferences(jsonStr);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize preferences", e);
            client.setPreferences("{}");
        }
        
        // Set up the bidirectional relationship
        client.setProvider(provider);
        provider.addClient(client);

        // Set dates if provided
        if (request.getDueDate() != null) {
            try {
                client.setDueDate(LocalDate.parse(request.getDueDate()).atStartOfDay());
            } catch (DateTimeParseException e) {
                throw new BadRequestException("Invalid due date format. Please use YYYY-MM-DD format.");
            }
        }
        if (request.getBirthDate() != null) {
            try {
                client.setBirthDate(LocalDate.parse(request.getBirthDate()).atStartOfDay());
            } catch (DateTimeParseException e) {
                throw new BadRequestException("Invalid birth date format. Please use YYYY-MM-DD format.");
            }
        }

        // Save both the client and provider (cascade will handle the relationship)
        var savedClient = clientRepository.save(client);
        providerRepository.save(provider);

        var jwtToken = jwtService.generateToken(savedClient);
        return AuthenticationResponse.create(jwtToken, savedClient);
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

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.create(jwtToken, user);
    }
} 