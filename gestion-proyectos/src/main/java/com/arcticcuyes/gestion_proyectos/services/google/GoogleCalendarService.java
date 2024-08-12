package com.arcticcuyes.gestion_proyectos.services.google;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Google.EventDTO;
import com.arcticcuyes.gestion_proyectos.dto.Reunion.InvitadoDTO;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
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
        return service.events().list("primary").setMaxResults(10).execute().getItems();
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
}
