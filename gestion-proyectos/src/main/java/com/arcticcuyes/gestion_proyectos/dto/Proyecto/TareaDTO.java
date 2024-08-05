package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TareaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private List<SubtareaDTO> subtareas;
    private Long estado;
    private List<Long> participantesAsignados;
}
