package com.lunara.api.auth.response;

import com.lunara.api.user.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private User user;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static AuthenticationResponse create(String token, User user) {
        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(token);
        response.setUser(user);
        return response;
    }
} 