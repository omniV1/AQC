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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SystemConfigRepository systemConfigRepository;

    @Value("${lunara.security.provider-registration-code}")
    private String defaultRegistrationCode;

    private static final String PROVIDER_REGISTRATION_CODE_KEY = "provider_registration_code";

    @PostConstruct
    public void init() {
        // Initialize registration code in database if not exists
        var existingCode = systemConfigRepository.findByKey(PROVIDER_REGISTRATION_CODE_KEY);
        if (existingCode.isEmpty()) {
            log.info("Initializing registration code in database with default value: {}", defaultRegistrationCode);
            systemConfigRepository.save(SystemConfig.builder()
                    .key(PROVIDER_REGISTRATION_CODE_KEY)
                    .value(defaultRegistrationCode)
                    .description("Provider registration code")
                    .build());
        } else {
            log.info("Registration code already exists in database");
        }
    }

    public boolean isValidRegistrationCode(String code) {
        log.debug("Validating registration code: {}", code);
        var configOpt = systemConfigRepository.findByKey(PROVIDER_REGISTRATION_CODE_KEY);
        log.debug("Found registration code in database: {}", configOpt.isPresent());
        
        if (configOpt.isPresent()) {
            var config = configOpt.get();
            log.debug("Stored registration code: {}", config.getValue());
            return config.getValue().equals(code);
        }
        
        log.debug("Using default registration code: {}", defaultRegistrationCode);
        return defaultRegistrationCode.equals(code);
    }

    public boolean isPasswordStrong(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }

        // Check for at least one uppercase letter
        if (!password.matches(".*[A-Z].*")) {
            return false;
        }

        // Check for at least one lowercase letter
        if (!password.matches(".*[a-z].*")) {
            return false;
        }

        // Check for at least one digit
        if (!password.matches(".*\\d.*")) {
            return false;
        }

        // Check for at least one special character
        return password.matches(".*[!@#$%^&*()\\-_=+{};:,<.>].*");
    }

    @Transactional
    public AuthenticationResponse registerProvider(RegisterProviderRequest request) {
        if (!isValidRegistrationCode(request.getRegistrationCode())) {
            throw new ForbiddenException("Invalid registration code");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already registered");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.PROVIDER)
                .build();

        var savedUser = userRepository.save(user);
        var token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .user(savedUser)
                .build();
    }

    @Transactional
    public AuthenticationResponse registerClient(User provider, CreateClientRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var client = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENT)
                .isActive(true)
                .build();

        userRepository.save(client);

        var profile = UserProfile.builder()
                .user(client)
                .dueDate(request.getDueDate() != null ? request.getDueDate().atStartOfDay() : null)
                .birthDate(request.getBirthDate() != null ? request.getBirthDate().atStartOfDay() : null)
                .birthType(request.getBirthType())
                .feedingStyle(request.getFeedingStyle())
                .birthLocation(request.getBirthLocation())
                .supportSystem(request.getSupportSystem())
                .concerns(request.getConcerns())
                .goals(request.getGoals())
                .build();

        userProfileRepository.save(profile);

        var token = jwtService.generateToken(client);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    public String getRegistrationCode() {
        return systemConfigRepository
                .findByKey(PROVIDER_REGISTRATION_CODE_KEY)
                .map(SystemConfig::getValue)
                .orElse(defaultRegistrationCode);
    }
} 