package com.lunara.api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Value;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    @Value("${server.cors.allowed-origins:http://localhost:5173}")
    private String allowedOriginsStr;

    @Value("${server.cors.allowed-methods:GET,POST,PUT,DELETE,OPTIONS}")
    private String allowedMethodsStr;

    @Value("${server.cors.allowed-headers:*}")
    private String allowedHeadersStr;

    @Value("${server.cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.debug("Configuring security filter chain");

        // Create and configure CORS
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        log.info("Setting up CORS configuration");
        
        // Set allowed origins
        corsConfiguration.setAllowedOrigins(Arrays.asList(allowedOriginsStr.split(",")));
        log.info("Allowed origins configured: {}", allowedOriginsStr);
        
        // Set allowed methods
        List<String> allowedMethods = Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"
        );
        corsConfiguration.setAllowedMethods(allowedMethods);
        log.info("Allowed methods: {}", allowedMethods);
        
        // Set allowed headers
        corsConfiguration.addAllowedHeader("*");
        log.info("Allowed headers configured with wildcard");
        
        // Set exposed headers
        List<String> exposedHeaders = Arrays.asList(
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        );
        corsConfiguration.setExposedHeaders(exposedHeaders);
        log.info("Exposed headers: {}", exposedHeaders);
        
        // Set other CORS properties
        corsConfiguration.setAllowCredentials(allowCredentials);
        corsConfiguration.setMaxAge(3600L);
        log.info("CORS credentials allowed: {}, Max age: 3600", allowCredentials);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        log.info("Registered CORS configuration for all paths /**");

        return http
            // Configure CORS first
            .cors(cors -> {
                cors.configurationSource(source);
                log.info("Applied CORS configuration to security chain");
            })
            // Disable CSRF
            .csrf(csrf -> {
                csrf.disable();
                log.info("CSRF disabled");
            })
            // Configure authorization
            .authorizeHttpRequests(auth -> {
                log.debug("Configuring authorization rules");
                auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers(
                        "/auth/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html"
                    )
                    .permitAll()
                    .requestMatchers("/api/v1/support-sessions/**").hasAnyRole("PROVIDER", "CLIENT")
                    .requestMatchers("/api/clients/**", "/api/providers/**").hasRole("PROVIDER")
                    .anyRequest()
                    .authenticated();
                log.info("Authorization rules configured");
            })
            // Configure session management
            .sessionManagement(session -> {
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                log.info("Session management configured to STATELESS");
            })
            // Configure authentication
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
} 