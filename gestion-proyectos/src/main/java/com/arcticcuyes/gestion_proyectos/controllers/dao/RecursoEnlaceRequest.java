package com.arcticcuyes.gestion_proyectos.controllers.dao;

import lombok.Data;

@Data
public class RecursoEnlaceRequest {
    private String titulo;
    private String enlace;
    private Long idProyecto;
    private Long idEntregableProyecto;
}
