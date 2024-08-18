package com.arcticcuyes.gestion_proyectos.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.SubtareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Tarea.EstadoDTO;
import com.arcticcuyes.gestion_proyectos.models.SubTarea;
import com.arcticcuyes.gestion_proyectos.models.Tarea;
import com.arcticcuyes.gestion_proyectos.repositories.EstadoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ParticipanteRepository;
import com.arcticcuyes.gestion_proyectos.repositories.SubtareaRepository;
import com.arcticcuyes.gestion_proyectos.repositories.TareaRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TareaService {
    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private ParticipanteRepository participanteRepository;

    @Autowired
    private SubtareaRepository subtareaRepository;

    public void delete(Long id) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con el id " + id));
        tareaRepository.delete(tarea);
    }

    public void update(TareaDTO tareaDto, Long id) {
        Tarea existingTarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con el id " + id));

        Tarea newTarea = setTareaFromDTO(existingTarea, tareaDto);
        tareaRepository.save(newTarea);
    }

    public Tarea setTareaFromDTO(Tarea tarea, TareaDTO tareaDTO) {
        tarea.setTitulo(tareaDTO.getTitulo());
        tarea.setDescripcion(tareaDTO.getDescripcion());
        tarea.setFechaInicio(tareaDTO.getFechaInicio());
        tarea.setFechaFin(tareaDTO.getFechaFin());
        tarea.setEstado(estadoRepository
                .findById(tareaDTO.getEstado())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Estado no encontrado con id: " + tareaDTO.getEstado())));

        // subtareas
        if(tareaDTO.getSubtareas() != null){
            tarea.getSubTareas().clear();
            for (SubtareaDTO subtareaDTO : tareaDTO.getSubtareas()) {
                SubTarea subtarea = new SubTarea();
                subtarea.setDescripcion(subtareaDTO.getDescripcion());
                subtarea.setCompletado(subtareaDTO.isCompletado());
                subtarea.setTarea(tarea);
                subtareaRepository.save(subtarea);
            }
        }else{
            tarea.getSubTareas().clear();
        }

        // participantes asignados
        tarea.getParticipantesAsignados().clear();
        tareaDTO.getParticipantesAsignados().forEach(participanteId -> {
            participanteRepository.findById(participanteId)
                    .ifPresent(participante -> tarea.getParticipantesAsignados().add(participante));
        });
        return tarea;
    }

    /* 
     * Obtiene una lista de tareas a las que está asignado el participante por id de usuario
     * @param usuarioId: id del usuario
     * @param proyectoId: id del proyecto
     * @return: lista de tareas asignadas al participante en el proyecto
     */
    public List<Tarea> getTareasAsignadas(Long usuarioId, Long proyectoId) {
        return tareaRepository.findByParticipantesInProyecto(usuarioId, proyectoId);
    }

    public void updateStatusTarea(Long idTarea, EstadoDTO estadoDTO) {
        tareaRepository.findById(idTarea)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con el id " + idTarea))
                .setEstado(estadoRepository
                        .findById(estadoDTO.getIdEstado())
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Estado no encontrado con id: " + estadoDTO.getIdEstado())));
    }
}
