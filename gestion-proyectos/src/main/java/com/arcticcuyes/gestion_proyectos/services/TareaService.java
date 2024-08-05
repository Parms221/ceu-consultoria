package com.arcticcuyes.gestion_proyectos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.SubtareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Tarea.FeedbackDTO;
import com.arcticcuyes.gestion_proyectos.models.FeedbackTarea;
import com.arcticcuyes.gestion_proyectos.models.SubTarea;
import com.arcticcuyes.gestion_proyectos.models.Tarea;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.EstadoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ParticipanteRepository;
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
        tarea.getSubTareas().clear();
                        
        for (SubtareaDTO subtareaDTO : tareaDTO.getSubtareas()) {
            SubTarea subtarea = new SubTarea();
            subtarea.setDescripcion(subtareaDTO.getDescripcion());
            subtarea.setTarea(tarea);
        }

        // participantes asignados
        tarea.getParticipantesAsignados().clear();
        tareaDTO.getParticipantesAsignados().forEach(participanteId -> {
            participanteRepository.findById(participanteId)
                    .ifPresent(participante -> tarea.getParticipantesAsignados().add(participante));
        });
        return tarea;
    }

    // public void addFeedback(Long idTarea, FeedbackDTO feedbackDTO, Usuario usuario) {
    //     Tarea tarea = tareaRepository.findById(idTarea)
    //             .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con el id " + idTarea));
    //     FeedbackTarea feedback = new FeedbackTarea();
    //     feedback.setMensaje(feedbackDTO.getMensaje());
    //     feedback.setUsuario(usuario);
    //     feedback.setTarea(tarea);
    //     tarea.getFeedbacks().add(feedback);
    //     tareaRepository.save(tarea);    
    // }
}
