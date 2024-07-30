package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Tarea.FeedbackDTO;
import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.ConsultorService;
import com.arcticcuyes.gestion_proyectos.services.TareaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tareas")
public class TareaController {
    @Autowired
    private TareaService tareaService;
    @Autowired 
    private ConsultorService consultorService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTarea(@PathVariable Long id, @RequestBody @Valid TareaDTO tareaDTO) {
        try {
            tareaService.update(tareaDTO, id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la tarea: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTarea(@PathVariable Long id) {
        try {
            tareaService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar la tarea: " + e.getMessage());
        }
    }

    // Endpoints de feedback para una tarea
    @PostMapping("/{id}/feedback")
    @Secured({"ROLE_CONSULTOR"})
    public ResponseEntity<?> addFeedback(
        @AuthenticationPrincipal UsuarioAuth auth,
        @PathVariable Long id, 
        @RequestBody @Valid FeedbackDTO feedbackDTO
    ) {
        try {
            // find consultor by user id
            System.out.println("Buscando consultor por usuario: " + auth.getUsuario().getId());
            Consultor consultor = consultorService.findConsultorByUser(auth.getUsuario());
            System.out.println("Registrando feedback de consultor: " + consultor);
            tareaService.addFeedback(id, feedbackDTO, consultor);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al agregar feedback a la tarea: " + e.getMessage());
        }
    }
}
