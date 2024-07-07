package com.arcticcuyes.gestion_proyectos.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.swing.text.html.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    


    public List<Proyecto> findProyectos() {
        return (List<Proyecto>) proyectoRepository.findAll();
    }

    public Proyecto findProyectoById(Long id) {
        return proyectoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con el id " + id));
    }


    public Proyecto saveProyecto(ProyectoDTO proyectoDTO) {
        // Diagnostico
        Cliente cr = saveClienteProyecto(proyectoDTO);
        // // Alcance
        Proyecto p = saveAlcanceProyecto(proyectoDTO, cr);    
        // // Cronograma
        saveCronogramaProyecto(proyectoDTO, p);

        return p;
    }

    public Cliente saveClienteProyecto(ProyectoDTO proyectoDTO){
        Cliente clientRegistred;
        if(proyectoDTO.getTipoCliente().equals("natural")){
            String dni = proyectoDTO.getClienteNaturalDto().getDni();
            // Implementar metodo para recoger cliente Existente
            // Cliente cExistente = clienteService.findClienteNaturalByDni(dni);
            clientRegistred = clienteService.saveClienteNatural(proyectoDTO.getClienteNaturalDto());
        }
        else{
            clientRegistred = clienteService.saveClienteJuridico(proyectoDTO.getClienteJuridicoDto());
        }
        return clientRegistred;
    }

    

    public Proyecto saveAlcanceProyecto(ProyectoDTO proyectoDTO, Cliente cliente){
        Proyecto proyecto = new Proyecto();
        proyecto.setCliente(cliente);
        proyecto.setTitulo(proyectoDTO.getTitulo());
        proyecto.setPrecio(proyectoDTO.getPrecio());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setObjetivos(proyectoDTO.getObjetivos());
        proyecto.setRequerimientos(proyectoDTO.getRequerimientos());
        proyecto.setIndicaciones(proyectoDTO.getIndicaciones());
        proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        proyecto.setFechaLimite(proyectoDTO.getFechaLimite());
        proyecto.setPrecio(proyectoDTO.getPrecio());

        Servicio servicio = servicioService.findServicioById(proyectoDTO.getServicio());
        if(servicio != null) proyecto.setServicio(servicio);

        Optional<Estado> estado = estadoRepository.findById(proyectoDTO.getEstado());
        if(estado != null) proyecto.setEstado(estado.get());

        proyecto = proyectoRepository.save(proyecto);
        
        //List<EntregableProyecto> entregables = new ArrayList<>();
        if (proyectoDTO.getEntregables() != null) {
            for (EntregableProyectoDTO entregableDTO : proyectoDTO.getEntregables()) {
                // Crear el objeto EntregableProyecto y establecer la relación bidireccional
                EntregableProyecto entregable = new EntregableProyecto();
                entregable.setProyecto(proyecto);

                Optional<EntregableServicio> entregableServicio = entregableServicioRepository.findById(entregableDTO.getEntregableServicio());
                entregable.setEntregableServicio(entregableServicio.get());

                // Guardar cada entregable
                entregableProyectoRepository.save(entregable);
            }
        }
        return proyectoRepository.save(proyecto);
    }


    public void saveCronogramaProyecto(ProyectoDTO proyectoDTO, Proyecto proyecto) {
        //proyecto = proyectoRepository.save(proyecto); // Guardar proyecto primero para obtener su ID
        System.out.println("El proyecto id es: " + proyecto.getIdProyecto());
        //List<Hito> hitos = new ArrayList<>();
        if(proyectoDTO.getHitos() != null){
            for (HitoDTO hitoDTO : proyectoDTO.getHitos()) {
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
    }
    
    

    public Proyecto updateProyecto(Long id, ProyectoDTO proyectoDTO) {
        Proyecto proyecto= proyectoRepository.findById(id).orElse(null);
        Cliente cr = updateClienteProyecto(proyectoDTO);
        Proyecto p = updateAlcanceProyecto(proyectoDTO, proyecto, cr);
        updateCronogramaProyecto(proyectoDTO, p);
        return p;
    }

    public void updateCronogramaProyecto(ProyectoDTO proyectoDTO, Proyecto proyecto) {
        System.out.println(proyectoDTO.getHitos());

        // Actualizar hitos, tareas y subtareas
        proyectoDTO.getHitos().forEach(hitoDTO -> {
            Hito hito = hitoRepository.findById(hitoDTO.getIdHito()).orElse(new Hito());
            System.out.println(hito.getTitulo());
            hito.setProyecto(proyecto);
            hito.setTitulo(hitoDTO.getTitulo());
            hito.setFechaInicio(hitoDTO.getFechaInicio());
            hito.setFechaFinalizacion(hitoDTO.getFechaFinalizacion());
            hito.setProyecto(proyecto);
            hitoRepository.save(hito);

            // Obtener las tareas existentes del hito
            List<Tarea> tareasExistentes = tareaRepository.findByHito(hito);
            List<TareaDTO> tareasNuevas = hitoDTO.getTareas();

            // Comparar y actualizar tareas
            tareasNuevas.forEach(tareaDTO -> {
                Tarea tarea = tareasExistentes.stream()
                    .filter(t -> t.getIdTarea().equals(tareaDTO.getIdTarea()))
                    .findFirst()
                    .orElse(new Tarea());
                tarea.setTitulo(tareaDTO.getTitulo());
                tarea.setDescripcion(tareaDTO.getDescripcion());
                tarea.setFechaInicio(tareaDTO.getFechaInicio());
                tarea.setFechaFin(tareaDTO.getFechaFin());
                tarea.setHito(hito);
                tareaRepository.save(tarea);

                // Obtener las subtareas existentes de la tarea
                List<SubTarea> subtareasExistentes = subTareaRepository.findByTarea(tarea);
                List<SubtareaDTO> subtareasNuevas = tareaDTO.getSubtareas();

                // Comparar y actualizar subtareas
                subtareasNuevas.forEach(subtareaDTO -> {
                    SubTarea subtarea = subtareasExistentes.stream()
                        .filter(st -> st.getIdSubTarea().equals(subtareaDTO.getIdSubTarea()))
                        .findFirst()
                        .orElse(new SubTarea());
                    subtarea.setDescripcion(subtareaDTO.getDescripcion());
                    subtarea.setTarea(tarea);
                    subTareaRepository.save(subtarea);
                });

                // Eliminar subtareas que no están en la nueva lista
                subtareasExistentes.stream()
                    .filter(st -> subtareasNuevas.stream().noneMatch(stDTO -> stDTO.getIdSubTarea().equals(st.getIdSubTarea())))
                    .forEach(subTareaRepository::delete);
            });

            // Eliminar tareas que no están en la nueva lista
            tareasExistentes.stream()
                .filter(t -> tareasNuevas.stream().noneMatch(tDTO -> tDTO.getIdTarea().equals(t.getIdTarea())))
                .forEach(tareaRepository::delete);
        });

        // Eliminar hitos que no están en la nueva lista
        List<Hito> hitosExistentes = hitoRepository.findByProyecto(proyecto);
        List<HitoDTO> hitosNuevos = proyectoDTO.getHitos();
        hitosExistentes.stream()
            .filter(h -> hitosNuevos.stream().noneMatch(hDTO -> hDTO.getIdHito().equals(h.getIdHito())))
            .forEach(hitoRepository::delete);
    }

    public Cliente updateClienteProyecto(ProyectoDTO proyectoDTO){
        Cliente clientRegistred;
        if(proyectoDTO.getTipoCliente().equals("natural")){
            String dni = proyectoDTO.getClienteNaturalDto().getDni();
            // Implementar metodo para recoger cliente Existente
            Cliente cExistente = clienteService.findClienteNaturalByDni(dni);
            if (cExistente != null) return cExistente;
            else clientRegistred = clienteService.saveClienteNatural(proyectoDTO.getClienteNaturalDto());
        }
        else{
            String ruc = proyectoDTO.getClienteJuridicoDto().getRuc();
            // Implementar metodo para recoger cliente Existente
            Cliente cExistente = clienteService.findClienteJuridicoByRuc(ruc);
            if (cExistente != null) return cExistente;
            else clientRegistred = clienteService.saveClienteJuridico(proyectoDTO.getClienteJuridicoDto());
        }
        return clientRegistred;
    }
    
    public Proyecto updateAlcanceProyecto(ProyectoDTO proyectoDTO, Proyecto proyecto, Cliente cliente){

        proyecto.setCliente(cliente);
        proyecto.setTitulo(proyectoDTO.getTitulo());
        proyecto.setPrecio(proyectoDTO.getPrecio());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setObjetivos(proyectoDTO.getObjetivos());
        proyecto.setRequerimientos(proyectoDTO.getRequerimientos());
        proyecto.setIndicaciones(proyectoDTO.getIndicaciones());
        proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        proyecto.setFechaLimite(proyectoDTO.getFechaLimite());
        proyecto.setPrecio(proyectoDTO.getPrecio());

        Servicio servicio = servicioService.findServicioById(proyectoDTO.getServicio());
        if(servicio != null) proyecto.setServicio(servicio);

        Optional<Estado> estado = estadoRepository.findById(proyectoDTO.getEstado());
        if(estado != null) proyecto.setEstado(estado.get());

        proyectoRepository.save(proyecto);

        if(proyectoDTO.getEntregables() != null){
            // Borrar los entregables que ya no estan en la nueva lista
            List<EntregableProyecto> entregableProyectos = proyecto.getEntregables();
            
            List<Long> idsEntregablesNuevos = proyectoDTO.getEntregables().stream()
            .map(ep -> ep.getEntregableServicio())
            .collect(Collectors.toList());

            entregableProyectos.stream()
            .filter(ep -> !idsEntregablesNuevos.contains(ep.getEntregableServicio().getIdEntregableServicio()))
            .forEach(entregableProyectoRepository::delete);

            entregableProyectos.removeIf(ep -> !idsEntregablesNuevos.contains(ep.getEntregableServicio().getIdEntregableServicio()));

            // Agrego nuevos entregables con los nuevos entregablesServicios que no estan en los entregablesProyectos existentes

            proyectoDTO.getEntregables().stream()
            .filter(ep -> !entregableProyectos.stream()
                    .anyMatch(epExisting -> epExisting.getEntregableServicio().getIdEntregableServicio().equals(ep.getEntregableServicio())))
            .forEach(ep -> {
                EntregableProyecto newEntregableProyecto = new EntregableProyecto();
                newEntregableProyecto.setProyecto(proyecto);
                Optional<EntregableServicio> entregableServicio = entregableServicioRepository.findById(ep.getEntregableServicio());
                newEntregableProyecto.setEntregableServicio(entregableServicio.get());
                entregableProyectoRepository.save(newEntregableProyecto);
            });
        }
        return proyectoRepository.save(proyecto);
    }
    
    
    
    public void deleteProyecto(Long id) {
        proyectoRepository.deleteById(id);
    }
}
