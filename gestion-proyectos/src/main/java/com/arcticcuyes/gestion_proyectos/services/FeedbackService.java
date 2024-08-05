package com.arcticcuyes.gestion_proyectos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Tarea.FeedbackDTO;
import com.arcticcuyes.gestion_proyectos.models.FeedbackTarea;
import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Tarea;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.HitoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.TareaRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackService {
    @Autowired
    private TareaRepository tareaRepository;
    
    @Autowired
    private HitoRepository hitoRepository;
    
    public void addFeedbackHito(Long idHito, FeedbackDTO feedbackDTO, Usuario usuario) {
        Hito hito = hitoRepository.findById(idHito)
                .orElseThrow(() -> new ResourceNotFoundException("Hito no encontrado con el id " + idHito));
        FeedbackTarea feedback = feedbackFromDto(feedbackDTO, usuario);
        feedback.setHito(hito);
        hito.getFeedbacks().add(feedback);
        hitoRepository.save(hito);
    }

    public void addFeedbackTarea(Long idTarea, FeedbackDTO feedbackDTO, Usuario usuario) {
        Tarea tarea = tareaRepository.findById(idTarea)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con el id " + idTarea));
        FeedbackTarea feedback = feedbackFromDto(feedbackDTO, usuario);
        feedback.setTarea(tarea);
        tarea.getFeedbacks().add(feedback);
        tareaRepository.save(tarea);    
    }

    public FeedbackTarea feedbackFromDto(
            FeedbackDTO feedbackDTO, Usuario usuario
    ){
        FeedbackTarea feedback = new FeedbackTarea();
        feedback.setMensaje(feedbackDTO.getMensaje());
        feedback.setUsuario(usuario);
        return feedback;
    }
}
