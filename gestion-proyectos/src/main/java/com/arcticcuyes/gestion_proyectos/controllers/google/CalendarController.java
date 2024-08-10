package com.arcticcuyes.gestion_proyectos.controllers.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleApiService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {
    @Autowired
    private GoogleApiService googleApiService;

    @GetMapping("/events")
    public ResponseEntity<?> listEvents(@AuthenticationPrincipal UsuarioAuth user) {
        try {
            Long userId = user.getUsuario().getId();  
            return ResponseEntity.ok(googleApiService.getEvents(userId.toString()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
}
