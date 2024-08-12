package com.arcticcuyes.gestion_proyectos.controllers.google;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.GoogleRequest;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.auth.OAuth2Service;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleApiService;
import com.google.api.services.oauth2.model.Userinfo;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/authorize")
public class AuthorizationController {
    @Autowired
    private OAuth2Service oAuth2Service;

    @Autowired
    private GoogleApiService googleApiService;

    @PostMapping({"/oauth2/code/google"})
    public ResponseEntity<?> AuthorizeGoogle(@AuthenticationPrincipal UsuarioAuth auth, @RequestBody GoogleRequest code) {
        try {
            System.out.println("Code: " + code.getCode());
            oAuth2Service.AuthorizeUser(code.getCode(), auth.getUsuario().getId());
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAuthorization(@AuthenticationPrincipal UsuarioAuth auth) {
        Map<String, Object> response = new HashMap<>();
        try{
            Long userId = auth.getUsuario().getId();
            Userinfo user = googleApiService.getGoogleAuthorizedAccount(userId.toString());
            response.put("status",  user != null ? "Authorized" : "Unauthorized");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (IOException e){
            // Manejar código de respuesta de google 401 no autorizado
            response.put("status", "Unauthorized");
            response.put("user", null);
            if(e.getMessage().contains("401")){
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(500).body("Error al verificar la autorización de Google");
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error al verificar la autorización de Google" + e.getMessage());
        }
    }
    
    @PostMapping("/oauth2/google/revoke")
    public ResponseEntity<?> revokeAuthorization(
        @AuthenticationPrincipal UsuarioAuth auth
    ) {
        try {
            Long userId = auth.getUsuario().getId();
            googleApiService.revokeGoogleAccount(userId.toString());
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al revocar la autorización de Google");
        }
    }
}
