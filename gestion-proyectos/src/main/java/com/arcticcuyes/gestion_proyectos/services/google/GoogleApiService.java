package com.arcticcuyes.gestion_proyectos.services.google;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;

@Service
public class GoogleApiService {
    @Value("${spring.security.oauth2.client.registration.google.client-name}")
    private String clientName;

    @Autowired
    private GoogleAuthorizationCodeFlow flow;

    public Calendar useGoogleApi(String userId) throws Exception{
        Credential credential = flow.loadCredential(userId);
        if(credential == null || credential.getAccessToken() == null){
            throw new IllegalStateException("No valid credentials found for user: " + userId);
        }

        Calendar service = new Calendar.Builder(
            GoogleNetHttpTransport.newTrustedTransport(), 
            GsonFactory.getDefaultInstance(), 
            credential
        ).setApplicationName(clientName).build();

        return service;
    }

    public List<Event> getEvents(String userId) throws Exception{
        Calendar service = useGoogleApi(userId);
        return service.events().list("primary").setMaxResults(10).execute().getItems();
    }
}
