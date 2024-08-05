package com.arcticcuyes.gestion_proyectos.exception.gpt;

import com.arcticcuyes.gestion_proyectos.exception.InvalidApiResponseException;
import com.fasterxml.jackson.databind.JsonNode;

public class GptResponseValidator {
    public static void validateApiResponse(JsonNode jsonResponse){
        if (!jsonResponse.has("fechaInicio") || !jsonResponse.has("fechaLimite") || !jsonResponse.has("hitos")) {
            throw new InvalidApiResponseException("Missing required fields in the response");
        }

        JsonNode hitos = jsonResponse.get("hitos");
        if (!hitos.isArray()) {
            throw new InvalidApiResponseException("Hitos should be an array");
        }

        for (JsonNode hito : hitos) {
            if (!hito.has("idHito") || !hito.has("titulo") || !hito.has("fechaInicio") || !hito.has("fechaFinalizacion")) {
                throw new InvalidApiResponseException("Missing required fields in hito object");
            }

            JsonNode tareasDelHito = hito.get("tareasDelHito");
            if (!tareasDelHito.isArray()) {
                throw new InvalidApiResponseException("tareasDelHito should be an array");
            }

            for (JsonNode tarea : tareasDelHito) {
                if (!tarea.has("idTarea") || !tarea.has("titulo") || !tarea.has("descripcion") || !tarea.has("fechaInicio") || !tarea.has("fechaFin")) {
                    throw new InvalidApiResponseException("Missing required fields in tarea object");
                }

                JsonNode participantesAsignados = tarea.get("participantesAsignados");
                if (!participantesAsignados.isArray()) {
                    throw new InvalidApiResponseException("participantesAsignados should be an array");
                }

                for (JsonNode participante : participantesAsignados) {
                    if (!participante.has("idParticipante") || !participante.has("consultorParticipante")) {
                        throw new InvalidApiResponseException("Missing required fields in participante object");
                    }

                    JsonNode consultorParticipante = participante.get("consultorParticipante");
                    if (!consultorParticipante.has("nombres")) {
                        throw new InvalidApiResponseException("Missing required fields in consultorParticipante object");
                    }
                }

                JsonNode subTareas = tarea.get("subTareas");
                if (!subTareas.isArray()) {
                    throw new InvalidApiResponseException("subTareas should be an array");
                }

                for (JsonNode subTarea : subTareas) {
                    if (!subTarea.has("descripcion")) {
                        throw new InvalidApiResponseException("Missing required fields in subTarea object");
                    }
                }
            }
        }
    }
}
