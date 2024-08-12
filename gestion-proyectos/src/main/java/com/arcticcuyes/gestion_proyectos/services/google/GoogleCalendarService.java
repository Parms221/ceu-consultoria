package com.arcticcuyes.gestion_proyectos.services.google;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Google.EventDTO;
import com.arcticcuyes.gestion_proyectos.dto.Reunion.InvitadoDTO;
import com.arcticcuyes.gestion_proyectos.models.Reunion;
import com.arcticcuyes.gestion_proyectos.repositories.ReunionRepository;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.ReunionService;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.calendar.model.ConferenceData;
import com.google.api.services.calendar.model.ConferenceSolutionKey;
import com.google.api.services.calendar.model.CreateConferenceRequest;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;

@Service
public class GoogleCalendarService {
    @Value("${spring.security.oauth2.client.registration.google.client-name}")
    private String clientName;

    @Autowired
    private GoogleApiService googleApiService;

    @Autowired
    private ReunionRepository reunionRepository;

    private Calendar useCalendarApi (Long userID) throws Exception {
         String id = userID.toString();
         Credential credential = googleApiService.useGoogleApi(id);
         Calendar service = new Calendar.Builder(
            GoogleNetHttpTransport.newTrustedTransport(), 
            GsonFactory.getDefaultInstance(), 
            credential
        ).setApplicationName(clientName).build();
        return service;
    }

    public List<CalendarListEntry> getCalendars (Long userId) throws Exception{
        Calendar service = useCalendarApi(userId);
        return service.calendarList().list().execute().getItems();
    }

    public List<Event> getEvents(Long userId) throws Exception{
        Calendar service = useCalendarApi(userId);
        // TODO: revisar max results
        return service.events().list("primary").setTimeMin(ThisYearStartTime()).execute().getItems();
    }

    public void deleteEvent(UsuarioAuth currentUser, String eventId) throws Exception {
        Calendar service = useCalendarApi(currentUser.getUsuario().getId());
        service.events().delete("primary", eventId).execute();
    }

    public Map<String, List<?>> getAllEvents(Long userId) throws Exception {
        List<Event> events = new ArrayList<>();
        try{
            Calendar service = useCalendarApi(userId);
            // Eventos de año actual en adelante
            events = service.events().list("primary").setTimeMin(
                ThisYearStartTime()
            ).execute().getItems();
        }catch(IllegalStateException e){
            // No se pudo obtener los eventos, devolver una lista vacia
            events = new ArrayList<>();
        }

        List<Reunion> reuniones = reunionRepository.findAll();
        // Filtrar eventos que no están en la lista de reuniones
        List<Event> filteredEvents = events.stream()
            .filter(event -> reuniones.stream()
                    .noneMatch(reunion -> reunion.getEventId().equals(event.getId())))
            .collect(Collectors.toList());
           
        Map<String, List<?>> result  = new HashMap<>();  
        result.put("events", filteredEvents);
        result.put("reuniones", reuniones);
        return result;
    }

    public Event insertEvent(UsuarioAuth currentUser, EventDTO eventDto) throws Exception{
        Calendar service = useCalendarApi(currentUser.getUsuario().getId());
        Event event = new Event();
        
        // Detalles de evento
        event.setSummary(eventDto.getSummary());
        event.setDescription(eventDto.getDescription());
        event.setEnd(eventDto.getEnd());
        event.setStart(eventDto.getStart());


        // Crear google meet
        ConferenceData conferenceData = new ConferenceData();
        ConferenceSolutionKey conferenceSolutionKey = new ConferenceSolutionKey();
        conferenceSolutionKey.setType("hangoutsMeet");
        CreateConferenceRequest createConferenceRequest = new CreateConferenceRequest();
        createConferenceRequest.setRequestId(UUID.randomUUID().toString());
        createConferenceRequest.setConferenceSolutionKey(conferenceSolutionKey);
        conferenceData.setCreateRequest(createConferenceRequest);
        event.setConferenceData(conferenceData);

        // Lista de participantes
        List<EventAttendee> attendees = new ArrayList<>();
        // -> Organizador
        Long userId = currentUser.getUsuario().getId();
        EventAttendee attendee = new EventAttendee();
        attendee.setEmail(googleApiService.getUserEmail(userId.toString()));
        attendee.setOrganizer(true);
        attendee.setOptional(false);
        attendees.add(attendee);

        // -> Asistentes
        for(InvitadoDTO invitado : eventDto.getAttendees()){
            EventAttendee attendee2 = new EventAttendee();
            attendee2.setEmail(invitado.getEmail());
            attendee2.setOptional(invitado.isOpcional());
            attendees.add(attendee2);
        }

        event.setAttendees(attendees);
        Event createdEvent = service.events()
                            .insert(eventDto.getCalendarId(), event)
                            .setConferenceDataVersion(1)
                            .setSendUpdates(eventDto.isSendUpdates() ? "all" : "none")
                            .execute();
        return createdEvent;
    }

    private DateTime ThisYearStartTime(){
        java.util.Calendar calendar = java.util.Calendar.getInstance();
        calendar.set(java.util.Calendar.MONTH, java.util.Calendar.JANUARY); // Establece el mes a enero
        calendar.set(java.util.Calendar.DAY_OF_MONTH, 1); // Establece el día al 1
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 0); // Establece la hora a las 00:00
        Date startTime = calendar.getTime();

        // Convierte a formato ISO (requerido por la API de Google Calendar)
        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        isoFormat.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
        String timeMin = isoFormat.format(startTime);
        // Retunr as Datetime
        return new DateTime(timeMin);
    }
}
