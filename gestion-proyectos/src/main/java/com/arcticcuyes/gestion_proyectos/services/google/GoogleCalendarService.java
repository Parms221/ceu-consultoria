package com.arcticcuyes.gestion_proyectos.services.google;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Google.EventDTO;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.calendar.model.Event;

@Service
public class GoogleCalendarService {
    @Value("${spring.security.oauth2.client.registration.google.client-name}")
    private String clientName;

    @Autowired
    private GoogleApiService googleApiService;

    private Calendar useCalendarApi (String userID) throws Exception {
         Credential credential = googleApiService.useGoogleApi(userID);
         Calendar service = new Calendar.Builder(
            GoogleNetHttpTransport.newTrustedTransport(), 
            GsonFactory.getDefaultInstance(), 
            credential
        ).setApplicationName(clientName).build();
        return service;
    }

    public List<CalendarListEntry> getCalendars (String userId) throws Exception{
        Calendar service = useCalendarApi(userId);
        return service.calendarList().list().execute().getItems();
    }

    public List<Event> getEvents(String userId) throws Exception{
        Calendar service = useCalendarApi(userId);
        return service.events().list("primary").setMaxResults(10).execute().getItems();
    }

    public Event insertEvent(String userId, EventDTO eventDto) throws Exception{
        Calendar service = useCalendarApi(userId);
        Event event = new Event();
        System.out.println(eventDto.getEnd());
        event.setEnd(eventDto.getEnd());
        event.setStart(eventDto.getStart());
        event.setHangoutLink("https://meet.google.com/abc-123");
        return service.events().insert(eventDto.getCalendarId(), event).execute();
    }
}
