package com.arcticcuyes.gestion_proyectos.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.ProyectoDTO;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.repositories.ProyectoRepository;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    public Page<Proyecto> findAll(Pageable pageable) {
        return proyectoRepository.findAll(pageable);
    }

    public Proyecto findProyectoById(Long id) {
        return proyectoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id " + id));
    }

    public Proyecto saveProyecto(ProyectoDTO proyectoDTO) {
        Proyecto proyecto = new Proyecto();
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setObjetivos(proyectoDTO.getObjetivos());
        proyecto.setRequerimientos(proyectoDTO.getRequerimientos());
        proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        proyecto.setFechaLimite(proyectoDTO.getFechaLimite());
        proyecto.setPrecio(proyectoDTO.getPrecio());

        return proyectoRepository.save(proyecto);
    }

    public Proyecto updateProyecto(Long id, ProyectoDTO proyectoDTO) {
        Proyecto existingProyecto = proyectoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id  " + id));
        
        existingProyecto.setDescripcion(proyectoDTO.getDescripcion());
        existingProyecto.setObjetivos(proyectoDTO.getObjetivos());
        existingProyecto.setRequerimientos(proyectoDTO.getRequerimientos());
        existingProyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        existingProyecto.setFechaLimite(proyectoDTO.getFechaLimite());
        existingProyecto.setPrecio(proyectoDTO.getPrecio());

        return proyectoRepository.save(existingProyecto);
    }

    public void deleteProyecto(Long id) {
        proyectoRepository.deleteById(id);
    }
}
