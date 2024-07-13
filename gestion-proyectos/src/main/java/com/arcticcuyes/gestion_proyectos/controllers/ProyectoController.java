package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.HitoDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.ProyectoDTO;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    @Autowired
    ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<Page<Proyecto>> getAllProyectos(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "") String search
    ) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        Page<Proyecto> proyectos = proyectoService.findProyectos(search, pageRequest);
        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("/propuestos")
    public ResponseEntity<?> getAllProyectosPropuestos() {
        
        try {
            final int estadoPropuestoId = 1;
            List<Proyecto> proyectos = proyectoService.getProyectosByEstado((long)estadoPropuestoId);
            if(proyectos.isEmpty()){
                return ResponseEntity.badRequest().build();
            }

        return ResponseEntity.ok(proyectos);    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener los proyectos propuestos: " + e.getMessage());
        }
        
    }

    @PostMapping("/propuestos/{id}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Proyecto> cambiarEstadoProyecto(@PathVariable long id, @RequestBody Map<String, String> payload) {
        try {
            Proyecto proyectoNuevoEstado;
            proyectoNuevoEstado = proyectoService.cambiarEstadoProyecto(id, Long.parseLong(payload.get("idEstado")));    
            return ResponseEntity.ok(proyectoNuevoEstado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
        }
    }

    @PostMapping("/addProyecto")
    public ResponseEntity<?> createProyecto(@Valid @RequestBody ProyectoDTO proyectoDTO, BindingResult bindingResult) throws ValidationError {

            Proyecto createdProyecto = proyectoService.saveProyecto(proyectoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProyecto);



        // if (bindingResult.hasErrors()) {
        //     // Recopila todos los errores de validación en un mapa
        //     Map<String, String> errors = bindingResult.getFieldErrors().stream().collect(Collectors.toMap(
        //                     fieldError -> fieldError.getField(),
        //                     fieldError -> fieldError.getDefaultMessage()
        //             ));

        //     // Devuelve la respuesta con los errores en formato JSON y estado 400 Bad Request
        //     return ResponseEntity.badRequest().body(errors);
        // }
        // try {
        //     Proyecto createdProyecto = proyectoService.saveProyecto(proyectoDTO);
        //     return ResponseEntity.status(HttpStatus.CREATED).body(createdProyecto);
        // } catch (Exception e) {
        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el proyecto: " + e.getMessage());
        // }
    }


    @GetMapping("/getProyecto/{id}")
    public ResponseEntity<?> getProyectoById(@PathVariable Long id) {
        try {
            Proyecto proyecto = proyectoService.findProyectoById(id);
            return ResponseEntity.ok(proyecto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proyecto no encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener el proyecto: " + e.getMessage());
        }
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el proyecto: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteProyecto/{id}")
    public ResponseEntity<Void> deleteProyectoById(@PathVariable Long id) {
        proyectoService.deleteProyecto(id);
        return ResponseEntity.noContent().build();
    }


    // Endpoints cronograma de proyecto
    @PostMapping("{id}/cronograma/save")
    public ResponseEntity<?> saveCronograma(@PathVariable Long id, @RequestBody List<HitoDTO> cronograma) {
        try {
            Proyecto proyecto = proyectoService.findProyectoById(id);
            proyectoService.saveCronogramaProyecto(cronograma, proyecto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el cronograma: " + e.getMessage());
        }
    }

}
