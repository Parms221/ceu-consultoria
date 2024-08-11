package com.arcticcuyes.gestion_proyectos.dto.Google;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.EventDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private String calendarId = "primary"; // Por defecto el calendario principal
    // End y start
    @NotNull
    @NotBlank
    private String end;

    @NotNull
    @NotBlank
    private String start;

    public EventDateTime getEnd(){
        EventDateTime end = new EventDateTime();
        end.setDateTime(new DateTime(this.end));
        end.setTimeZone("America/Lima");
        return end;
    }

    public EventDateTime getStart(){
        EventDateTime start = new EventDateTime();
        start.setDateTime(new DateTime(this.start));
        start.setTimeZone("America/Lima");
        return start;
    }
}
