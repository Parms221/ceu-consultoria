package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.AuthResponse;
import com.arcticcuyes.gestion_proyectos.controllers.dao.GoogleRequest;
import com.arcticcuyes.gestion_proyectos.controllers.dao.LoginRequest;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.auth.AuthService;
import com.arcticcuyes.gestion_proyectos.services.auth.OAuth2Service;



@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
   
    @Autowired
    private OAuth2Service oAuth2Service;
   

    @PostMapping(path="/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse authRes = authService.login(request);
        if(authRes.getToken() == null){
            return ResponseEntity.status(401).body(authRes);
        }
        return ResponseEntity.ok(authRes);
    }
    
    @PostMapping({"/authorize/oauth2/code/google"})
    public ResponseEntity<?> AuthorizeGoogle(@AuthenticationPrincipal UsuarioAuth auth, @RequestBody GoogleRequest code) {
        try {
            System.out.println(code.getCode());
            oAuth2Service.AuthorizeUser(code.getCode(), auth.getUsuario().getId());
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
    
}
