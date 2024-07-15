package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.HitoDTO;
import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.services.HitoService;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;

@RestController
public class HitoController {

    @Autowired
    HitoService hitoService;

    @Autowired
    ProyectoService proyectoService;

    @GetMapping("/hito/{id}")
    public Optional<Hito> getHitoByID(@PathVariable Long id){
        return hitoService.findHitoById(id);
    }

    @PostMapping("/hito/{idProyecto}/update/{idHito}")
    public ResponseEntity<?> updateHito(@PathVariable Long idHito, @RequestBody HitoDTO hitodDto, @PathVariable Long idProyecto) {
        try {
            Proyecto p = proyectoService.findProyectoById(idProyecto);
            hitoService.updateHitoById(hitodDto,idHito,p);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el hito: " + e.getMessage());
        }
    }

    @DeleteMapping("/hito/deleteHito/{id}")
    public ResponseEntity<Void> deleteHitoById(@PathVariable Long id) {
        hitoService.deleteHitoById(id);
        return ResponseEntity.noContent().build();
    }
}
