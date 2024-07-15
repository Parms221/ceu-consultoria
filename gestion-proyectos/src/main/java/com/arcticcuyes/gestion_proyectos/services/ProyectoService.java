package com.arcticcuyes.gestion_proyectos.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

        //System.out.println("aqui: ");


        return saveAlcanceProyecto(proyectoDTO, cliente.get(), servicio.get(), estado.get());
    }

    // public Proyecto updateProyecto(Long id, ProyectoDTO proyectoDTO) throws ValidationError {
    //     Optional<Servicio> servicio = servicioService.findById(proyectoDTO.getServicio());
    //     if(servicio.isEmpty()) {
    //         throw new ValidationError("Servicio no encontrado", "servicio");
    //     }

    //     Optional<Estado> estado = estadoRepository.findById(proyectoDTO.getEstado());
    //     if(estado.isEmpty()) {
    //         throw new ValidationError("Estado no encontrado", "estado");
    //     }

    //     Optional<Cliente> cliente = clienteService.findById(proyectoDTO.getIdCliente());
    //     if (cliente.isEmpty()){
    //         throw new ValidationError("Cliente no encontrado", "idCliente");
    //     }

    //     //System.out.println("aqui: ");


    //     return updateAlcanceProyecto(id, proyectoDTO, cliente.get(), servicio.get(), estado.get());
    // }
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
        
        List<Long> idsConsultores = proyectoDTO.getParticipantes();
        for (Long id : idsConsultores){
            Optional<Consultor> consultor = consultorRepository.findById(id);
            if(consultor.isEmpty()) {
                throw new ValidationError("Consultor no encontrado","participante");
            }
            Participante participante = new Participante();
            participante.setConsultorParticipante(consultor.get());
            participante.setProyectoIngresado(proyecto);
            participanteRepository.save(participante);
        }

        List<EntregableServicio> entregableServicios = entregableServicioRepository.findByServicio(servicio);

        for (EntregableServicio entregableServicio : entregableServicios) {
            // Crear el objeto EntregableProyecto y establecer la relación bidireccional
            EntregableProyecto entregable = new EntregableProyecto();
            entregable.setProyecto(proyecto);

            entregable.setEntregableServicio(entregableServicio);

            // Guardar cada entregable
            entregableProyectoRepository.save(entregable);
        }

        //saveCronogramaProyecto(proyectoDTO.getHitos(), proyecto);
        return proyecto;
    }



    // public void saveCronogramaProyecto(ProyectoDTO proyectoDTO, Proyecto proyecto) {
    public void saveCronogramaProyecto(List<HitoDTO> hitos, Proyecto proyecto) {

        System.out.println("El proyecto id es: " + proyecto.getIdProyecto());
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

                    Optional<Estado> estado = estadoRepository.findById(tareaDTO.getEstado());
                    if(estado.isEmpty()) {
                        throw new ValidationError("Estado no encontrado","participante");
                    }
                    System.out.println(estado);
                    tarea.setEstado(estado.get());
                    tarea.setFechaFin(tareaDTO.getFechaFin());
                    Set<Participante> participantes = new HashSet<>(participanteRepository.findByConsultorParticipante_IdConsultorIn(tareaDTO.getParticipantesAsignados()));
                    tarea.setParticipantesAsignados(participantes);
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

//    public void saveParticipantesProyecto(List<Long> consultores, Proyecto proyecto) {
//        List<Participante> participantes = new ArrayList<>();
//            for (Long consultorId : consultores) {
//                // buscar consultor por id o null
//                Consultor consultor = consultorRepository.findById(consultorId ).orElse(null);
//                // Crear el objeto Participante y establecer la relación bidireccional
//                Participante participante = new Participante();
//                participante.setProyectoIngresado(proyecto);
//                participante.setConsultorParticipante(consultorId);
//
//                // Guardar cada participante
//                // participanteRepository.save(participante);
//            }
//    }
    public Proyecto updateAlcanceProyecto(Long proyectoId, ProyectoDTO proyectoDTO, Cliente cliente, Servicio servicio, Estado estado) {
        // Buscar el proyecto existente
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + proyectoId));

        // Actualizar los detalles del proyecto
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

        // Guardar el proyecto actualizado
        proyecto = proyectoRepository.save(proyecto);

        // Obtener la lista de IDs de consultores desde el DTO
        List<Long> idsConsultores = proyectoDTO.getParticipantes();

        // Obtener los participantes actuales del proyecto
        Set<Participante> participantesActuales = participanteRepository.findByProyectoIngresado(proyecto);

        // Crear una lista para almacenar los participantes que coinciden con los IDs del DTO
        List<Participante> participantesFinales = new ArrayList<>();

        // Recorrer la lista de IDs de consultores
        for (Long idConsultor : idsConsultores) {
            // Verificar si ya existe un participante con el ID de consultor
            boolean encontrado = false;
            for (Participante participante : participantesActuales) {
                if (participante.getConsultorParticipante().getIdConsultor() == idConsultor) {
                    // Si el participante ya existe, lo agregamos a la lista final
                    participantesFinales.add(participante);
                    encontrado = true;
                    break; // Romper el bucle interno ya que encontramos al participante
                }
            }

            // Si no encontramos al participante, creamos uno nuevo
            if (!encontrado) {
                Optional<Consultor> consultor = consultorRepository.findById(idConsultor);
                if (consultor.isEmpty()) {
                    throw new ValidationError("Consultor no encontrado", "participante");
                }
                Participante nuevoParticipante = new Participante();
                nuevoParticipante.setConsultorParticipante(consultor.get());
                nuevoParticipante.setProyectoIngresado(proyecto);
                nuevoParticipante = participanteRepository.save(nuevoParticipante); // Guardar el nuevo participante
                participantesFinales.add(nuevoParticipante); // Agregar el nuevo participante a la lista final
            }
        }

        // Eliminar los participantes que ya no están en la lista de IDs
        for (Participante participante : participantesActuales) {
            if (!idsConsultores.contains(participante.getConsultorParticipante().getIdConsultor())) {
                participanteRepository.delete(participante);
            }
        }

        // Obtener la lista de entregables desde el DTO
        List<EntregableProyectoDTO> entregablesProyectoDTO = proyectoDTO.getEntregables();

        // Extraer los IDs de los entregables desde la lista de DTOs usando un bucle for
        List<Long> idsEntregablesServicio = new ArrayList<>();
        for (EntregableProyectoDTO dto : entregablesProyectoDTO) {
            idsEntregablesServicio.add(dto.getEntregableServicio());
        }

        //System.out.println("xxxxxxxxxxxxxxxxxx ------------- --" + idsEntregablesServicio);
        // Obtener los entregables actuales asociados al proyecto
        List<EntregableProyecto> entregableProyectos = entregableProyectoRepository.findByProyecto(proyecto);

        // Crear una lista para almacenar los entregables que coinciden con los IDs del DTO
        List<EntregableProyecto> entregablesFinales = new ArrayList<>();

        // Recorrer la lista de IDs de entregables de servicio
        for (EntregableProyectoDTO dto : entregablesProyectoDTO) {
            Long idEntregableServicio = dto.getEntregableServicio();
            boolean encontrado = false;

            // Verificar si ya existe un entregable proyecto con el ID de entregable de servicio
            for (EntregableProyecto entregableProyecto : entregableProyectos) {
                if (entregableProyecto.getEntregableServicio().getIdEntregableServicio() == idEntregableServicio) {
                    entregablesFinales.add(entregableProyecto);
                    encontrado = true;
                    break;
                }
            }

            // Si no encontramos un EntregableProyecto con el ID de EntregableServicio, creamos uno nuevo
            if (!encontrado) {
                Optional<EntregableServicio> entregableServicioOpt = entregableServicioRepository.findById(idEntregableServicio);
                if (entregableServicioOpt.isEmpty()) {
                    throw new ValidationError("Entregable de servicio no encontrado", "entregableServicio");
                }
                EntregableProyecto nuevoEntregableProyecto = new EntregableProyecto();
                nuevoEntregableProyecto.setEntregableServicio(entregableServicioOpt.get());
                nuevoEntregableProyecto.setProyecto(proyecto);
                nuevoEntregableProyecto = entregableProyectoRepository.save(nuevoEntregableProyecto); // Guardar el nuevo entregable proyecto
                entregablesFinales.add(nuevoEntregableProyecto); // Agregar el nuevo entregable proyecto a la lista final
            }
        }

        // Eliminar los entregables que ya no están en la lista de IDs
        for (EntregableProyecto entregableProyecto : entregableProyectos) {
            boolean encontrado = false;
            for (EntregableProyectoDTO dto : entregablesProyectoDTO) {
                if (entregableProyecto.getEntregableServicio().getIdEntregableServicio() == dto.getEntregableServicio()) {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                entregableProyectoRepository.delete(entregableProyecto);
            }
        }


        return proyecto;
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
