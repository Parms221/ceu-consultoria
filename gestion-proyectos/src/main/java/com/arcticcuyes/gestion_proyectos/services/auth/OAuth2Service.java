package com.arcticcuyes.gestion_proyectos.services.auth;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;

@Service
public class OAuth2Service {
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Autowired
    private GoogleAuthorizationCodeFlow flow;

    public void AuthorizeUser(String code, Long userId) throws IOException {
        // Intercambiar código por tokens
        GoogleTokenResponse tokenResponse = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
        saveTokens(tokenResponse, userId);
    }

    private void saveTokens(GoogleTokenResponse tokenResponse, Long userId) throws IOException {
        flow.createAndStoreCredential(tokenResponse, userId.toString());
    }
}
