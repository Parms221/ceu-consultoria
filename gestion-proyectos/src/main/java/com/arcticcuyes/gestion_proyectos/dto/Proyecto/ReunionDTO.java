package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;


import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReunionDTO {

    private Long idReunion;

    private String titulo;

    private String enlace;

    private Timestamp fechaInicio;

    private Timestamp fechaFin;

}
