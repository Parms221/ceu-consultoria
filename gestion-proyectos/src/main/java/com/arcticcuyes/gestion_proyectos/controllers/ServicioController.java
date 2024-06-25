package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.EntregableServicioDTO;
import com.arcticcuyes.gestion_proyectos.dto.ServicioDTO;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableServicioRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ServicioRepository;
import com.arcticcuyes.gestion_proyectos.services.ServicioService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    ServicioService servicioService;

    @GetMapping("/")
    public ResponseEntity<Page<Servicio>> getAllServicios(Pageable pageable) {
        Page<Servicio> page = servicioService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/addServicio")
    public ResponseEntity<?> createServicio(@Valid @RequestBody ServicioDTO servicioDTO, BindingResult bindingResult) {
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
            Servicio createdServicio = servicioService.saveServicio(servicioDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdServicio);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el servicio: " + e.getMessage());
        }
    }
    
    @GetMapping("/getServicio/{id}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Long id) {
        Servicio servicio = servicioService.findServicioById(id);
        return ResponseEntity.ok(servicio);
    }

    @PutMapping("/updateServicio/{id}")
    public ResponseEntity<?> updateServicio(
            @PathVariable Long id,
            @RequestBody ServicioDTO servicioDTO,
            BindingResult bindingResult) {
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
            Servicio updatedServicio = servicioService.updateServicio(id, servicioDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedServicio);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el servicio: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteServicio/{id}")
    public ResponseEntity<Void> deleteServicioById(@PathVariable Long id) {
        servicioService.deleteServicio(id);
        return ResponseEntity.noContent().build();
    }

}
