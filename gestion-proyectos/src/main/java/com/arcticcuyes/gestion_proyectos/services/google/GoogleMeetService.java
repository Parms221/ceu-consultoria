package com.arcticcuyes.gestion_proyectos.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;

@Service
public class GoogleMeetService {
    @Autowired
    private GoogleAuthorizationCodeFlow flow;
    
    public String createMeeting(String userId) throws Exception {
        Credential credential = flow.loadCredential(userId);
        if(credential == null || credential.getAccessToken() == null){
            throw new IllegalStateException("No valid credentials found for user: " + userId);
        }
        
        return "Meeting created";

    }
}
