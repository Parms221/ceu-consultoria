package com.arcticcuyes.gestion_proyectos.controllers.google;

import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Google.EventDTO;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleCalendarService;
import com.google.api.services.calendar.model.Event;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
@RequestMapping("/calendars")
public class CalendarController {
    @Autowired
    private GoogleCalendarService gcalendarService;

    @GetMapping
    public ResponseEntity<?> listCalendars(@AuthenticationPrincipal UsuarioAuth user) {
        // Por el momento no está permitido el acceso a través de este método
        try {
            Long userId = user.getUsuario().getId();  
            return ResponseEntity.ok(gcalendarService.getCalendars(userId));
        } catch (Exception e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN).body(errors);
        }
    }


    // Devuelve solo eventos de google calendar
    @GetMapping("/events")
    public ResponseEntity<?> listEvents(@AuthenticationPrincipal UsuarioAuth user) {
        try {
            Long userId = user.getUsuario().getId();  
            return ResponseEntity.ok(gcalendarService.getEvents(userId));
        } catch (Exception e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body(errors);
        }
    }

    // devuelve eventos de google calendar y de la aplicación (reuniones meet)
    @GetMapping("/events/all")
    public ResponseEntity<?> listAllEvents(@AuthenticationPrincipal UsuarioAuth user) {
        try {
            Long userId = user.getUsuario().getId();  
            return ResponseEntity.ok(gcalendarService.getAllEvents(userId));
        } catch (Exception e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body(errors);
        }
    }

    @PostMapping("/events")
    public ResponseEntity<?> insertEvent(@AuthenticationPrincipal UsuarioAuth user, @RequestBody @Valid EventDTO event) {
        Map<String, String> errors = new HashMap<>();
        try {
            Event newEvent = gcalendarService.insertEvent(user, event);
            return ResponseEntity.ok(newEvent);
        } catch (Exception e) {
            errors.put("error", "Ocurrió un error inesperado al insertar el evento");
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
      
    }
}
