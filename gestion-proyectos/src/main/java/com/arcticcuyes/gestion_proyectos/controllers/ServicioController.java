package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Servicio.ServicioDTO;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.services.ServicioService;
import jakarta.validation.Valid;

import java.util.Map;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<Servicio>> getAllServicios() {
        List<Servicio> servicios = servicioService.findAll();
        return ResponseEntity.ok(servicios);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createServicio(@Valid @RequestBody ServicioDTO servicioDTO, BindingResult bindingResult) {
        System.out.println(servicioDTO);
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
    
    @GetMapping("/{id}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Long id) {
        Servicio servicio = servicioService.findServicioById(id);
        return ResponseEntity.ok(servicio);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Servicio> updateServicio(
            @PathVariable Long id,
            @RequestBody ServicioDTO servicioDTO) {
        
        Servicio updatedServicio = servicioService.updateServicio(id, servicioDTO);
        return ResponseEntity.ok(updatedServicio);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleeteServicio (@PathVariable Long id){
        servicioService.deleteServicio(id);
        return new ResponseEntity<>("Servicio eliminado", HttpStatus.OK);
    }

}
