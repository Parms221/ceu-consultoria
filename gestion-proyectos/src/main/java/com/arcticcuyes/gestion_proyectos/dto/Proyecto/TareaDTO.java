package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;
import java.util.List;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TareaDTO {
    private Long idTarea;
    private String titulo;
    private String descripcion;
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private List<SubtareaDTO> subtareas;
}
