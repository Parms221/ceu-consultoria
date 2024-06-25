package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.ProyectoDTO;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    @Autowired
    ProyectoService proyectoService;

    @GetMapping("/")
    public ResponseEntity<Page<Proyecto>> getAllProyectos(Pageable pageable) {
        Page<Proyecto> page = proyectoService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/addProyecto")
    public ResponseEntity<?> createProyecto(@Valid @RequestBody ProyectoDTO proyectoDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Recopila todos los errores de validación en un mapa
            Map<String, String> errors = bindingResult.getFieldErrors().stream().collect(Collectors.toMap(
                            fieldError -> fieldError.getField(),
                            fieldError -> fieldError.getDefaultMessage()
                    ));

            // Devuelve la respuesta con los errores en formato JSON y estado 400 Bad Request
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            Proyecto createdProyecto = proyectoService.saveProyecto(proyectoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProyecto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el servicio: " + e.getMessage());
        }
    }

    @GetMapping("/getProyecto/{id}")
    public ResponseEntity<Proyecto> getProyectoById(@PathVariable Long id) {
        Proyecto proyecto = proyectoService.findProyectoById(id);
        return ResponseEntity.ok(proyecto);
    }

    @PutMapping("/updateProyecto/{id}")
    public ResponseEntity<?> updateProyecto(@PathVariable Long id,@Valid @RequestBody ProyectoDTO proyectoDTO, BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            // Recopila todos los errores de validación en un mapa
            Map<String, String> errors = bindingResult.getFieldErrors().stream().collect(Collectors.toMap(
                            fieldError -> fieldError.getField(),
                            fieldError -> fieldError.getDefaultMessage()
                    ));

            // Devuelve la respuesta con los errores en formato JSON y estado 400 Bad Request
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            Proyecto updatedProyecto = proyectoService.updateProyecto(id,proyectoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedProyecto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el servicio: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteProyecto/{id}")
    public ResponseEntity<Void> deleteProyectoById(@PathVariable Long id) {
        proyectoService.deleteProyecto(id);
        return ResponseEntity.noContent().build();
    }

}
