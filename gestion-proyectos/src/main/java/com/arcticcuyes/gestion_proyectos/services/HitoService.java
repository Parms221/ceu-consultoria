package com.arcticcuyes.gestion_proyectos.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.HitoDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.SubtareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;
import com.arcticcuyes.gestion_proyectos.dto.Servicio.EntregableServicioDTO;
import com.arcticcuyes.gestion_proyectos.dto.Servicio.ServicioDTO;
import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.models.SubTarea;
import com.arcticcuyes.gestion_proyectos.models.Tarea;
import com.arcticcuyes.gestion_proyectos.repositories.EstadoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.HitoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ParticipanteRepository;
import com.arcticcuyes.gestion_proyectos.repositories.SubtareaRepository;
import com.arcticcuyes.gestion_proyectos.repositories.TareaRepository;
@Service
public class HitoService {

    @Autowired
    private HitoRepository hitoRepository;
    
    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private ParticipanteRepository participanteRepository;

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private SubtareaRepository subTareaRepository;



    public Optional<Hito> findHitoById(Long id){
        return hitoRepository.findById(id);
    }
   
    @Transactional
    public Hito saveHito(HitoDTO hitoDTO, Proyecto proyecto) {
        Hito hito = new Hito();
        hito.setTitulo(hitoDTO.getTitulo());
        System.out.println("El titulo del hito creado es: " + hitoDTO.getTitulo());
        hito.setFechaInicio(hitoDTO.getFechaInicio());
        hito.setFechaFinalizacion(hitoDTO.getFechaFinalizacion());
        hito.setProyecto(proyecto);

        hito = hitoRepository.save(hito); // Guardar hito para obtener su ID

        // List<Tarea> tareas = new ArrayList<>();
        if (hitoDTO.getTareas() != null) {
            for (TareaDTO tareaDTO : hitoDTO.getTareas()) {
                Tarea tarea = new Tarea();
                tarea.setTitulo(tareaDTO.getTitulo());
                tarea.setDescripcion(tareaDTO.getDescripcion());
                tarea.setFechaInicio(tareaDTO.getFechaInicio());
                tarea.setFechaFin(tareaDTO.getFechaFin());
                tarea.setHito(hito);

                tarea = tareaRepository.save(tarea); // Guardar tarea para obtener su ID

                // List<SubTarea> subtareas = new ArrayList<>();
                if (hitoDTO.getTareas() != null) {
                    for (SubtareaDTO subtareaDTO : tareaDTO.getSubtareas()) {
                        SubTarea subtarea = new SubTarea();
                        subtarea.setDescripcion(subtareaDTO.getDescripcion());
                        subtarea.setTarea(tarea);

                        subTareaRepository.save(subtarea); // Guardar subtarea para obtener su ID
                    }
                }
            }
        }
        return hito;
    }

    @Transactional
    public Hito updateHitoById(HitoDTO hitoDTO, Long id, Proyecto proyecto) {
    Hito existHito = hitoRepository.findById(id).orElse(new Hito());
    existHito.setTitulo(hitoDTO.getTitulo());
    existHito.setFechaInicio(hitoDTO.getFechaInicio());
    existHito.setFechaFinalizacion(hitoDTO.getFechaFinalizacion());
    existHito = hitoRepository.save(existHito); // Guardar hito para obtener su ID

    // Obtener las tareas actuales del hito
    List<Tarea> tareasExistentes = tareaRepository.findByHito_IdHito(existHito.getIdHito());

    // Crear un conjunto con los IDs de las nuevas tareas
    Set<Long> tareaDTOIds = hitoDTO.getTareas() != null ?
            hitoDTO.getTareas().stream()
                    .filter(t -> t.getId() != null)  // Solo incluir IDs no nulos
                    .map(TareaDTO::getId)
                    .collect(Collectors.toSet())
            : new HashSet<>();

    // Identificar y eliminar las tareas que no están en la nueva lista
    for (Tarea tarea : tareasExistentes) {
        if (!tareaDTOIds.contains(tarea.getIdTarea())) {
            // Eliminar subtareas asociadas
            subTareaRepository.deleteAllByTarea_IdTarea(tarea.getIdTarea());
            tareaRepository.delete(tarea);
        }
    }

    if (hitoDTO.getTareas() != null) {
        for (TareaDTO tareaDTO : hitoDTO.getTareas()) {
            Tarea tarea;
            if (tareaDTO.getId() != null) {
                // Actualizar tarea existente
                tarea = tareaRepository.findById(tareaDTO.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + tareaDTO.getId()));
            } else {
                // Crear nueva tarea
                tarea = new Tarea();
            }
            tarea.setTitulo(tareaDTO.getTitulo());
            tarea.setDescripcion(tareaDTO.getDescripcion());
            tarea.setFechaInicio(tareaDTO.getFechaInicio());
            tarea.setFechaFin(tareaDTO.getFechaFin());

            Optional<Estado> estado = estadoRepository.findById(tareaDTO.getEstado());
            if (estado.isEmpty()) {
                throw new ValidationError("Estado no encontrado", "estado");
            }
            tarea.setEstado(estado.get());

            // Obtener el proyecto asociado al hito
            Long proyectoId = proyecto.getIdProyecto();
            // Obtener todos los participantes cuyos consultores coincidan con los IDs proporcionados y que estén asociados con el proyecto
            Set<Participante> nuevosParticipantes = new HashSet<>(participanteRepository.findByConsultorParticipante_IdConsultorInAndProyectoIngresado_IdProyecto(tareaDTO.getParticipantesAsignados(), proyectoId));

            // Obtener los participantes actuales asociados a la tarea
            Set<Participante> participantesActuales = tarea.getParticipantesAsignados();

            // Calcular los participantes a añadir y a eliminar
            Set<Participante> participantesAAgregar = nuevosParticipantes.stream()
                    .filter(p -> !participantesActuales.contains(p))
                    .collect(Collectors.toSet());

            Set<Participante> participantesAEliminar = participantesActuales.stream()
                    .filter(p -> !nuevosParticipantes.contains(p))
                    .collect(Collectors.toSet());

            // Actualizar la lista de participantes
            participantesActuales.removeAll(participantesAEliminar);
            participantesActuales.addAll(participantesAAgregar);
            tarea.setParticipantesAsignados(participantesActuales);

            tarea.setHito(existHito);
            tarea = tareaRepository.save(tarea); // Guardar tarea para obtener su ID

            // Obtener subtareas actuales asociadas a la tarea
            List<SubTarea> subtareasExistentes = subTareaRepository.findByTarea_IdTarea(tarea.getIdTarea());

            // Crear un conjunto con los IDs de las nuevas subtareas
            Set<Long> subtareaDTOIds = tareaDTO.getSubtareas() != null ?
                    tareaDTO.getSubtareas().stream()
                            .filter(s -> s.getId() != null)  // Solo incluir IDs no nulos
                            .map(SubtareaDTO::getId)
                            .collect(Collectors.toSet())
                    : new HashSet<>();

            // Identificar y eliminar las subtareas que no están en la nueva lista
            for (SubTarea subtarea : subtareasExistentes) {
                if (!subtareaDTOIds.contains(subtarea.getIdSubTarea())) {
                    subTareaRepository.delete(subtarea);
                }
            }

            // Procesar y actualizar o crear nuevas subtareas
            if (tareaDTO.getSubtareas() != null) {
                for (SubtareaDTO subtareaDTO : tareaDTO.getSubtareas()) {
                    SubTarea subtarea;

                    if (subtareaDTO.getId() != null) {
                        // Actualizar subtarea existente
                        subtarea = subTareaRepository.findById(subtareaDTO.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Subtarea no encontrada con id: " + subtareaDTO.getId()));
                    } else {
                        // Crear nueva subtarea
                        subtarea = new SubTarea();
                    }
                    subtarea.setDescripcion(subtareaDTO.getDescripcion());
                    subtarea.setTarea(tarea);

                    subTareaRepository.save(subtarea); // Guardar subtarea para obtener su ID
                }
            }
        }
    }

    return hitoRepository.save(existHito);
}

public void deleteHitoById(Long id) {
    hitoRepository.deleteById(id);
}
 
}
