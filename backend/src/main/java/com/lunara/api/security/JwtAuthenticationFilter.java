package com.lunara.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(JwtService jwtService, @Lazy UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        
        // Log request details
        log.info("Processing request: {} {}", request.getMethod(), request.getRequestURI());
        log.info("Request headers:");
        Collections.list(request.getHeaderNames()).forEach(headerName -> 
            log.info("  {}: {}", headerName, request.getHeader(headerName))
        );

        String jwt = null;
        String userEmail = null;
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
            log.debug("JWT token found for user: {}", userEmail);
        } else {
            log.debug("No JWT token found in request");
        }

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            log.debug("Loaded user details for {}, Authorities: {}", userEmail, userDetails.getAuthorities());

            if (jwtService.isTokenValid(jwt, userDetails)) {
                log.info("JWT token is valid for user: {}", userEmail);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.info("Authentication token set in SecurityContext for user: {}", userEmail);
            } else {
                log.warn("Invalid JWT token for user: {}", userEmail);
            }
        }

        // Log response headers after processing
        log.info("Response headers before sending:");
        response.getHeaderNames().forEach(headerName ->
            log.info("  {}: {}", headerName, response.getHeader(headerName))
        );

        filterChain.doFilter(request, response);
        
        // Log final response headers
        log.info("Final response headers:");
        response.getHeaderNames().forEach(headerName ->
            log.info("  {}: {}", headerName, response.getHeader(headerName))
        );
    }
} 