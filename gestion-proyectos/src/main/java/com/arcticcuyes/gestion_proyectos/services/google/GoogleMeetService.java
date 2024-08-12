package com.arcticcuyes.gestion_proyectos.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.meet.v2.Meet;
import com.google.api.services.meet.v2.model.Space;

@Service
public class GoogleMeetService {
    @Value("${spring.security.oauth2.client.registration.google.client-name}")
    private String clientName;

    @Autowired
    private GoogleAuthorizationCodeFlow flow;
    
    private Meet useMeetApi(Long userId) throws Exception {
        String id = userId.toString();
        Credential credential = flow.loadCredential(id);
        if(credential == null || credential.getAccessToken() == null){
            throw new IllegalStateException("No valid credentials found for user: " + userId);
        }
        Meet service = new Meet.Builder(
            GoogleNetHttpTransport.newTrustedTransport(), 
            GsonFactory.getDefaultInstance(),
            credential
        ).setApplicationName(clientName).build();

        return service;
    }

    
    public Space createSpace(Long userId) throws Exception {
        Meet service = useMeetApi(userId);
        Space space = new Space();
        return service.spaces().create(space).execute();
    }
}
