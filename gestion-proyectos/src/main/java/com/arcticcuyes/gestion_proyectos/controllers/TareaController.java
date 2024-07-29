package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;
import com.arcticcuyes.gestion_proyectos.services.TareaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tareas")
public class TareaController {
    @Autowired
    private TareaService tareaService;

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
}
