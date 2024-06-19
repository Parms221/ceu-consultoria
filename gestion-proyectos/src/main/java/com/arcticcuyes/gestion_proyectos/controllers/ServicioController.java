package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableServicioRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ServicioRepository;

@RestController
@RequestMapping("/servicio")
public class ServicioController {

    @Autowired
    ServicioRepository servicioRepository;

    @Autowired
    EntregableServicioRepository entregablesRepository;

    @GetMapping("/get")
    public ResponseEntity<?> getServicios() {
        List<Servicio> servicios = (List<Servicio>) servicioRepository.findAll();
        if (servicios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(servicios, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getServicios(@PathVariable Long id) {
        try {
            Optional<Servicio> optionalServicio = servicioRepository.findById(id);
            if (optionalServicio.isPresent()) {
                Servicio servicio = optionalServicio.get();
                return new ResponseEntity<>(servicio, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Servicio no encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener el servicio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

    @PostMapping("/post")
    public ResponseEntity<?> saveServicio(@RequestBody ServicioDTO servicioDTO) {
        try {
            // Crear un nuevo objeto Servicio a partir de ServicioDTO
            Servicio servicio = new Servicio();
            servicio.setTitulo(servicioDTO.getTitulo());
            servicio.setPrecio(servicioDTO.getPrecio());
            servicio.setDescripcion(servicioDTO.getDescripcion());

            Servicio savedServicio = servicioRepository.save(servicio);

            // Guardar los EntregableServicio asociados
            List<EntregableServicio> entregables = new ArrayList<>();
            if (servicioDTO.getEntregablesServicio() != null) {
                for (EntregableServicioDTO entregableDTO : servicioDTO.getEntregablesServicio()) {
                    // Crear el objeto EntregableServicio y establecer la relación bidireccional
                    EntregableServicio entregable = new EntregableServicio();
                    entregable.setTitulo(entregableDTO.getTitulo());
                    entregable.setDescripcion(entregableDTO.getDescripcion());
                    entregable.setServicio(savedServicio); // Establecer la relación con el servicio persistido

                    // Guardar cada entregable
                    EntregableServicio savedEntregable = entregablesRepository.save(entregable);
                    entregables.add(savedEntregable);
                }
            }

            // Establecer la lista de entregables en el servicio
            savedServicio.setEntregablesDelServicio(entregables);

            return new ResponseEntity<>(savedServicio, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al guardar el servicio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateServicio(@PathVariable Long id, @RequestBody ServicioDTO servicioDTO) {
        try {
            // Verificar si el servicio existe
            if (!servicioRepository.existsById(id)) {
                return new ResponseEntity<>("Servicio no encontrado", HttpStatus.NOT_FOUND);
            }

            // Obtener el servicio existente
            Servicio existingServicio = servicioRepository.findById(id).orElse(null);

            // Actualizar los campos del servicio
            existingServicio.setTitulo(servicioDTO.getTitulo());
            existingServicio.setPrecio(servicioDTO.getPrecio());
            existingServicio.setDescripcion(servicioDTO.getDescripcion());

            // Manejar los EntregableServicio asociados
            List<EntregableServicio> updatedEntregables = new ArrayList<>();
            if (servicioDTO.getEntregablesServicio() != null) {
                for (EntregableServicioDTO entregableDTO : servicioDTO.getEntregablesServicio()) {
                    EntregableServicio entregable;
                    if (entregableDTO.getId() != null) {
                        // Actualizar el entregable existente
                        entregable = entregablesRepository.findById(entregableDTO.getId()).get();
                    } else {
                        // Crear un nuevo entregable
                        entregable = new EntregableServicio();
                    }
                    entregable.setTitulo(entregableDTO.getTitulo());
                    entregable.setDescripcion(entregableDTO.getDescripcion());
                    entregable.setServicio(existingServicio);

                    // Guardar el entregable
                    EntregableServicio savedEntregable = entregablesRepository.save(entregable);
                    updatedEntregables.add(savedEntregable);
                }
            }

            // Guardar el servicio actualizado
            Servicio updatedServicio = servicioRepository.save(existingServicio);

            // Eliminar los entregables que ya no están en la lista actualizada
            List<EntregableServicio> currentEntregables = existingServicio.getEntregablesDelServicio();
            
            for (EntregableServicio entregable : currentEntregables) {
                if (!updatedEntregables.contains(entregable)) {
                    entregablesRepository.delete(entregable);
                }
            }
            return new ResponseEntity<>(updatedServicio, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el servicio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteServicio(@PathVariable Long id) {
        try {
            // Verificar si el servicio existe
            if (!servicioRepository.existsById(id)) {
                return new ResponseEntity<>("Servicio no encontrado", HttpStatus.NOT_FOUND);
            }
            // Eliminar el servicio y sus entregables asociados
            servicioRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el servicio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
