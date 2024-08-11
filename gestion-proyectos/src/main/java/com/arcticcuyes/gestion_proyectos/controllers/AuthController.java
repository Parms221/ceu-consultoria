package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.AuthResponse;
import com.arcticcuyes.gestion_proyectos.controllers.dao.LoginRequest;
import com.arcticcuyes.gestion_proyectos.services.auth.AuthService;



@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
   
    @PostMapping(path="/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse authRes = authService.login(request);
        if(authRes.getToken() == null){
            return ResponseEntity.status(401).body(authRes);
        }
        return ResponseEntity.ok(authRes);
    }
}
