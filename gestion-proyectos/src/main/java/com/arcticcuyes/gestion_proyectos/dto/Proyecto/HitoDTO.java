package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class HitoDTO {
    private Long idHito;
    private String titulo;
    private Timestamp fechaInicio;
    private Timestamp fechaFinalizacion;
    private List<TareaDTO> tareas;

}

