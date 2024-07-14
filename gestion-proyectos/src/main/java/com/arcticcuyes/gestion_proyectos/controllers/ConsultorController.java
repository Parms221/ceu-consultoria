package com.arcticcuyes.gestion_proyectos.controllers;

import com.arcticcuyes.gestion_proyectos.dto.Consultor.ConsultorDto;
import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.services.ConsultorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultores")
public class ConsultorController {

    @Autowired
    private ConsultorService consultorService;

    @GetMapping()
    public List<Consultor> getAllConsultors() {
        return consultorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultor> getConsultorById(@PathVariable long id) {
        Consultor consultor = consultorService.findConsultorById(id);
        if (consultor != null) {
            return ResponseEntity.ok(consultor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Consultor> createConsultor(@RequestBody @Valid ConsultorDto consultorDto) throws ValidationError {
        Consultor createdConsultor = consultorService.saveConsultor(consultorDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdConsultor);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateConsultor(@PathVariable long id, @RequestBody @Valid ConsultorDto consultorDto) {
        Consultor found = consultorService.findConsultorById(id);
        if (found != null) {
            consultorService.updateConsultor(found, consultorDto);
            return new ResponseEntity<>("Consultor actualizado", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Consultor no encontrado", HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteConsultor(@PathVariable Long id) {
        consultorService.deleteConsultor(id);
        return ResponseEntity.noContent().build();
    }

}
