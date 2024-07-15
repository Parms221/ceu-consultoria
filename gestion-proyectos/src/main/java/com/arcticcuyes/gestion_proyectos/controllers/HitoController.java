package com.arcticcuyes.gestion_proyectos.controllers;

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
import com.arcticcuyes.gestion_proyectos.services.HitoService;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/hitos")
public class HitoController {

    @Autowired
    HitoService hitoService;

    @Autowired
    ProyectoService proyectoService;

    @GetMapping("/{id}")
    public Optional<Hito> getHitoByID(@PathVariable Long id){
        return hitoService.findHitoById(id);
    }

    @PostMapping("{idProyecto}/save")
    public ResponseEntity<?> saveHito(@PathVariable Long idProyecto, @RequestBody @Valid HitoDTO hitoDTO) {
        System.out.println("Hito recibido" + hitoDTO);
        try {
            Proyecto proyecto = proyectoService.findProyectoById(idProyecto);
            hitoService.saveHito(hitoDTO, proyecto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el cronograma: " + e.getMessage());
        }
    }

    @PostMapping("/{idProyecto}/update/{idHito}")
    public ResponseEntity<?> updateHito(@PathVariable Long idHito, @RequestBody HitoDTO hitodDto, @PathVariable Long idProyecto) {
        try {
            Proyecto p = proyectoService.findProyectoById(idProyecto);
            hitoService.updateHitoById(hitodDto,idHito,p);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el hito: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteHito/{id}")
    public ResponseEntity<Void> deleteHitoById(@PathVariable Long id) {
        hitoService.deleteHitoById(id);
        return ResponseEntity.noContent().build();
    }
}
