package com.arcticcuyes.gestion_proyectos.config;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

import jakarta.persistence.EntityNotFoundException;


@Configuration
public class GoogleOAuth2Config {
    @Value("${spring.security.oauth2.client.registration.google.scope}")
    private String scopes;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
    
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String tokenUri;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Bean
    public GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow() throws IOException {
        try {
            Details secretDetails = new Details();
            secretDetails.setClientId(clientId);
            secretDetails.setClientSecret(clientSecret);
            secretDetails.setTokenUri(tokenUri);
            secretDetails.setRedirectUris(Collections.singletonList(redirectUri));

            GoogleClientSecrets clientSecrets = new GoogleClientSecrets();
            clientSecrets.setWeb(secretDetails);

            return new GoogleAuthorizationCodeFlow.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance(),
                    clientSecrets,
                    Arrays.asList(scopes.split(",")))
                    .setDataStoreFactory(new FileDataStoreFactory(new File("stores")))
                    .setAccessType("offline")
                    .build();
        } catch (EntityNotFoundException e) {
            throw new IOException("Error al crear el flujo de autorización de Google", e);
        }
    }
}
