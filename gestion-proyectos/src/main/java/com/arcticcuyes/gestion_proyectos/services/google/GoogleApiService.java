package com.arcticcuyes.gestion_proyectos.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;

@Service
public class GoogleApiService {
    @Autowired
    private GoogleAuthorizationCodeFlow flow;

    public Credential useGoogleApi(String userId) throws Exception{
        Credential credential = flow.loadCredential(userId);
        if(credential == null || credential.getAccessToken() == null){
            throw new IllegalStateException("Las credenciales no son válidas, por favor, vuelva a autenticarse");
        }
       return credential;
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
