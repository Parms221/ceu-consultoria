package com.arcticcuyes.gestion_proyectos.services;
import com.arcticcuyes.gestion_proyectos.dto.Servicio.EntregableServicioDTO;
import com.arcticcuyes.gestion_proyectos.dto.Servicio.ServicioDTO;
import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Representante;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteRepository;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableServicioRepository;
import com.arcticcuyes.gestion_proyectos.repositories.RepresentanteRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ServicioRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private EntregableServicioRepository entregableServicioRepository;

    public List<Servicio> findAll() {
        return (List<Servicio>) servicioRepository.findAll();
    }

    public Servicio findServicioById(Long id) {
        return servicioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con el id " + id));
    }

    public Servicio saveServicio(ServicioDTO servicioDTO) {
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
                EntregableServicio savedEntregable = entregableServicioRepository.save(entregable);
                entregables.add(savedEntregable);
            }
        }

        // Establecer la lista de entregables en el servicio
        savedServicio.setEntregablesDelServicio(entregables);

        return servicioRepository.save(servicio);
    }

    public Servicio updateServicio(Long id, ServicioDTO servicioDTO) {
        Servicio existingServicio = servicioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con el id  " + id));
        
        //Actualizar los campos del servicio
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
                    entregable = entregableServicioRepository.findById(entregableDTO.getId()).get();
                } else {
                    // Crear un nuevo entregable
                    entregable = new EntregableServicio();
                }
                entregable.setTitulo(entregableDTO.getTitulo());
                entregable.setDescripcion(entregableDTO.getDescripcion());
                entregable.setServicio(existingServicio);

                // Guardar el entregable
                EntregableServicio savedEntregable = entregableServicioRepository.save(entregable);
                updatedEntregables.add(savedEntregable);
            }

            List<EntregableServicio> currentEntregables = existingServicio.getEntregablesDelServicio();
            for (EntregableServicio entregable : currentEntregables) {
                if (!updatedEntregables.contains(entregable)) {
                    entregableServicioRepository.delete(entregable);
                }
            }
        }
        
        existingServicio.setEntregablesDelServicio(updatedEntregables);
        return servicioRepository.save(existingServicio);
    }

    public void deleteServicio(Long id) {
        servicioRepository.deleteById(id);
    }

}

