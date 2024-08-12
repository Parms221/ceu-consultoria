package com.arcticcuyes.gestion_proyectos.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Google.EventDTO;
import com.arcticcuyes.gestion_proyectos.dto.Reunion.InvitadoDTO;
import com.arcticcuyes.gestion_proyectos.dto.Reunion.ReunionDTO;
import com.arcticcuyes.gestion_proyectos.models.InvitadoReunion;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.models.Reunion;
import com.arcticcuyes.gestion_proyectos.repositories.ReunionRepository;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleCalendarService;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleMeetService;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.meet.v2.model.Space;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReunionService {

    @Autowired
    private GoogleCalendarService  gCalendarService;

    @Autowired
    private GoogleMeetService gMeetService;

    @Autowired
    private ReunionRepository reunionRepository;
    
    public List<Reunion> listAll(){
        return reunionRepository.findAll();
    }

    public List<Reunion> findByProject(Proyecto proyecto){
        return reunionRepository.findByProyecto(proyecto);
    }

    public Reunion create(Proyecto proyecto, ReunionDTO reunionDTO, UsuarioAuth currentUser) throws Exception {
       // https://developers.google.com/meet/api/reference/rest/v2
            Reunion reunion = new Reunion();
            reunion.setUsuario(currentUser.getUsuario());
            reunion.setTitulo(reunionDTO.getTitulo());
            reunion.setDescripcion(reunionDTO.getDescripcion());
            reunion.setFechaInicio(reunionDTO.getFechaInicio());
            reunion.setFechaFin(reunionDTO.getFechaFin());


            reunion.setInvitados(new ArrayList<>());
            // Invitados
            for (InvitadoDTO invitadoDTO : reunionDTO.getInvitados()) {
                InvitadoReunion invitado = new InvitadoReunion();
                invitado.setEmail(invitadoDTO.getEmail());
                invitado.setOpcional(invitadoDTO.isOpcional());
                invitado.setReunion(reunion);
                reunion.getInvitados().add(invitado);
            }

            // Se asigna al proyecto
            reunion.setProyecto(proyecto);
            Event evento = null;
            try {
                // Crear eventode google para la reunión
                if(reunionDTO.isCrearEvento()){
                    evento = createMeetingEvent(reunion, currentUser, reunionDTO.isEnviarUpdates());
                    if (evento != null){
                        System.out.println("Evento creado con enlace de meet" + evento.getHangoutLink());
                        reunion.setEventHtmlLink(evento.getHtmlLink());
                        reunion.setEventOrganizer(evento.getOrganizer().getEmail());
                        reunion.setEnlace(evento.getHangoutLink());
                        reunion.setEventId(evento.getId());
                    }
                }else{
                    // Creación de google meet space si no se crea el evento
                    Space meetingSpace = gMeetService.createSpace(currentUser.getUsuario().getId());
                    reunion.setEnlace(meetingSpace.getMeetingUri());
                    reunion.setEventOrganizer(currentUser.getUsuario().getEmail());
     
                }
            }catch (Exception e){
                throw new Exception("Error al crear evento de reunion en google: " + e.getMessage());
            }
            
            reunionRepository.save(reunion);

            return reunion;
    }

    public Event createMeetingEvent(Reunion reunion, UsuarioAuth currentUser, Boolean sendUpdates) throws Exception {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setHangoutLink(reunion.getEnlace());
        eventDTO.setSummary(reunion.getTitulo());
        eventDTO.setDescription(reunion.getDescripcion());
        eventDTO.setSendUpdates(sendUpdates);
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

        eventDTO.setEnd(sdf.format(reunion.getFechaFin()));
        eventDTO.setStart(sdf.format(reunion.getFechaInicio()));
       
        eventDTO.setAttendees(new ArrayList<>());
        for (InvitadoReunion invitado : reunion.getInvitados()) {
            eventDTO.getAttendees().add(new InvitadoDTO(invitado.getEmail(), invitado.isOpcional()));
        }
        return gCalendarService.insertEvent(currentUser, eventDTO);
    }
}
