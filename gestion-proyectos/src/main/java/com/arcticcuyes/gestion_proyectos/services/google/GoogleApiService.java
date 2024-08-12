package com.arcticcuyes.gestion_proyectos.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.api.services.oauth2.Oauth2;
import com.google.api.services.oauth2.model.Userinfo;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class GoogleApiService {
    @Autowired
    private GoogleAuthorizationCodeFlow flow;

    @Value("${spring.security.oauth2.client.registration.google.client-name}")
    private String clientName;

    public Credential useGoogleApi(String userId) throws Exception{
        Credential credential = flow.loadCredential(userId);
        if(credential == null || credential.getAccessToken() == null){
            throw new IllegalStateException("Las credenciales no son válidas, por favor, vuelva a autenticarse");
        }
       return credential;
    }

    public String getUserEmail(String userId) throws Exception{
        Credential credential = flow.loadCredential(userId); 
        Oauth2 oauth2 = new Oauth2.Builder(
            GoogleNetHttpTransport.newTrustedTransport(), 
            GsonFactory.getDefaultInstance(), 
            credential
        ).setApplicationName(clientName).build();
        Userinfo userinfo = oauth2.userinfo().get().execute();
        return userinfo.getEmail();
    }

    /* Método para remover la autorización de un usuario */
    public void revokeGoogleAccount(String userId) throws Exception{
        try {
            Credential credential = flow.loadCredential(userId);
            if(credential != null && credential.getAccessToken() != null){
                flow.getCredentialDataStore().delete(userId);
            }
        } catch (Exception e) {
            throw new IllegalStateException("No se pudo eliminar la autorización de la cuenta de Google");
        }
    }

    /* Verificar si la cuenta de Google está autorizada */
    public boolean isGoogleAuthorized(String userId) throws Exception{
        try {
            Credential credential = flow.loadCredential(userId);
            return credential != null && credential.getAccessToken() != null;
        } catch (Exception e) {
            return false;
        }
    }
}
