package com.arcticcuyes.gestion_proyectos.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.*;
import com.arcticcuyes.gestion_proyectos.models.*;
import com.arcticcuyes.gestion_proyectos.repositories.*;



@Service
@Transactional
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;
    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ServicioService servicioService;
    @Autowired
    private EntregableServicioRepository entregableServicioRepository;
    
    @Autowired
    private EntregableProyectoRepository entregableProyectoRepository;

    @Autowired
    private TareaRepository tareaRepository;
    @Autowired
    private SubtareaRepository subTareaRepository;
    @Autowired
    private HitoRepository hitoRepository;
    @Autowired
    private ConsultorRepository consultorRepository;
    @Autowired
    private ParticipanteRepository participanteRepository;


    public Page<Proyecto> findProyectos(String titulo, PageRequest pageRequest) {
        return proyectoRepository.findProyectoByTituloContainingIgnoreCase(titulo, pageRequest);
    }

    public Proyecto findProyectoById(Long id) {
        return proyectoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id " + id));
    }

    public List<Proyecto> getProyectosByEstado(Long idEstado) {
        return proyectoRepository.findAllByEstadoIdEstado(idEstado);
    }

    public Proyecto cambiarEstadoProyecto(Long idProyecto, Long idEstado){
        Proyecto obtenido = proyectoRepository.findById(idProyecto).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id  " + idProyecto));
        Estado proyectoEstadoAnterior = estadoRepository.findById(idEstado).get();
        obtenido.setEstado(proyectoEstadoAnterior);
        Proyecto proyectoNuevoEstado = proyectoRepository.save(obtenido);
        return proyectoNuevoEstado;
    }


    public Proyecto saveProyecto(ProyectoDTO proyectoDTO) throws ValidationError {
        Optional<Servicio> servicio = servicioService.findById(proyectoDTO.getServicio());
        if(servicio.isEmpty()) {
            throw new ValidationError("Servicio no encontrado", "servicio");
        }

        Optional<Estado> estado = estadoRepository.findById(proyectoDTO.getEstado());
        if(estado.isEmpty()) {
            throw new ValidationError("Estado no encontrado", "estado");
        }

        Optional<Cliente> cliente = clienteService.findById(proyectoDTO.getIdCliente());
        if (cliente.isEmpty()){
            throw new ValidationError("Cliente no encontrado", "idCliente");
        }

        return saveAlcanceProyecto(proyectoDTO, cliente.get(), servicio.get(), estado.get());
    }

    // public Cliente saveClienteProyecto(ProyectoDTO proyectoDTO){
    //     Cliente clientRegistred;
    //     if(proyectoDTO.getTipoCliente().equals("natural")){
    //         String dni = proyectoDTO.getClienteNaturalDto().getDni();
    //         // Implementar metodo para recoger cliente Existente
    //         // Cliente cExistente = clienteService.findClienteNaturalByDni(dni);
    //         clientRegistred = clienteService.saveClienteNatural(proyectoDTO.getClienteNaturalDto());
    //     }
    //     else{
    //         clientRegistred = clienteService.saveClienteJuridico(proyectoDTO.getClienteJuridicoDto());
    //     }
    //     return clientRegistred;
    // }

    @Transactional
    public Proyecto saveAlcanceProyecto(ProyectoDTO proyectoDTO, Cliente cliente, Servicio servicio, Estado estado){
        Proyecto proyecto = new Proyecto();
        proyecto.setCliente(cliente);
        proyecto.setEstado(estado);
        proyecto.setServicio(servicio);
        proyecto.setTitulo(proyectoDTO.getTitulo());
        proyecto.setPrecio(proyectoDTO.getPrecio());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setObjetivos(proyectoDTO.getObjetivos());
        proyecto.setRequerimientos(proyectoDTO.getRequerimientos());
        proyecto.setIndicaciones(proyectoDTO.getIndicaciones());
        proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        proyecto.setFechaLimite(proyectoDTO.getFechaLimite());
        proyecto.setPrecio(proyectoDTO.getPrecio());

        //Guardar proyecto para luego poder con los entregables
        proyecto = proyectoRepository.save(proyecto);

        List<EntregableServicio> entregableServicios = entregableServicioRepository.findByServicio(servicio);

        for (EntregableServicio entregableServicio : entregableServicios) {
            // Crear el objeto EntregableProyecto y establecer la relación bidireccional
            EntregableProyecto entregable = new EntregableProyecto();
            entregable.setProyecto(proyecto);

            entregable.setEntregableServicio(entregableServicio);

            // Guardar cada entregable
            entregableProyectoRepository.save(entregable);
        }

        // proyecto.setEntregables(entregablesProyecto);
        // System.out.println(proyecto.getEntregables());
        
        //List<EntregableProyecto> entregables = new ArrayList<>();
        // if (proyectoDTO.getEntregables() != null) {
        //     for (EntregableProyectoDTO entregableDTO : proyectoDTO.getEntregables()) {
        //         // Crear el objeto EntregableProyecto y establecer la relación bidireccional
        //         EntregableProyecto entregable = new EntregableProyecto();
        //         entregable.setProyecto(proyecto);

        //         Optional<EntregableServicio> entregableServicio = entregableServicioRepository.findById(entregableDTO.getEntregableServicio());
        //         entregable.setEntregableServicio(entregableServicio.get());

        //         // Guardar cada entregable
        //         entregableProyectoRepository.save(entregable);
        //     }
        // }
        return proyecto;
    }



    public List<Hito> getCronogramaProyecto(Long idProyecto){
        return proyectoRepository.findById(idProyecto)
            .orElseThrow(() -> 
            new ResourceNotFoundException("Proyecto no encontrado con el id  " + idProyecto))
            .getHitos();
    }

    public void saveCronogramaProyecto(List<HitoDTO> hitos, Proyecto proyecto) {

        //proyecto = proyectoRepository.save(proyecto); // Guardar proyecto primero para obtener su ID
        System.out.println("El proyecto id es: " + proyecto.getIdProyecto());
        //List<Hito> hitos = new ArrayList<>();
        // if(proyectoDTO.getHitos() != null){
            for (HitoDTO hitoDTO : hitos) {
                Hito hito = new Hito();
                hito.setTitulo(hitoDTO.getTitulo());
                System.out.println("El titulo del hito es: " + hitoDTO.getTitulo());
                hito.setFechaInicio(hitoDTO.getFechaInicio());
                hito.setFechaFinalizacion(hitoDTO.getFechaFinalizacion());
                hito.setProyecto(proyecto);

                hito = hitoRepository.save(hito); // Guardar hito para obtener su ID
            
                //List<Tarea> tareas = new ArrayList<>();
                if(hitoDTO.getTareas() != null){
                    for (TareaDTO tareaDTO : hitoDTO.getTareas()) {
                        Tarea tarea = new Tarea();
                        tarea.setTitulo(tareaDTO.getTitulo());
                        tarea.setDescripcion(tareaDTO.getDescripcion());
                        tarea.setFechaInicio(tareaDTO.getFechaInicio());
                        tarea.setFechaFin(tareaDTO.getFechaFin());
                        tarea.setHito(hito);
            
                        tarea = tareaRepository.save(tarea); // Guardar tarea para obtener su ID
            
                        //List<SubTarea> subtareas = new ArrayList<>();
                        if(hitoDTO.getTareas() != null){
                            for (SubtareaDTO subtareaDTO : tareaDTO.getSubtareas()) {
                                SubTarea subtarea = new SubTarea();
                                subtarea.setDescripcion(subtareaDTO.getDescripcion());
                                subtarea.setTarea(tarea);
                
                                subTareaRepository.save(subtarea); // Guardar subtarea para obtener su ID
                            }
                        }
                    }
                }
            }
        
        } 
    // }

    @Transactional
    public void saveParticipantesProyecto(List<Long> consultores, Proyecto proyecto) {
        try {
            // Limpiar la lista existente de participantes
            proyecto.getParticipantes().clear();

            for (Long consultorId : consultores) {
                // buscar consultor por id o null
                Consultor consultor = consultorRepository.findById(consultorId).orElse(null);
                if (consultor == null) {
                    System.out.println("Consultor con id " + consultorId + " no encontrado.");
                    continue;
                }
                // Crear el objeto Participante y establecer la relación bidireccional
                Participante participante = new Participante();
                participante.setProyectoIngresado(proyecto);
                participante.setConsultorParticipante(consultor);

                // Guardar cada participante
                participanteRepository.save(participante);
                proyecto.getParticipantes().add(participante);
            }

            proyectoRepository.save(proyecto);
        } catch (Exception e) {
            System.err.println("Error al guardar los participantes: " + e.getMessage());
            e.printStackTrace();
            throw e; // Re-throw the exception to be handled by the controller
        }
    }

    public Proyecto updateProyecto(Long id, ProyectoDTO proyectoDTO) {
        Proyecto existingProyecto = proyectoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id  " + id));
        existingProyecto.setTitulo(proyectoDTO.getTitulo());
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
