package com.arcticcuyes.gestion_proyectos.controllers.dao;

import lombok.Data;

@Data
public class GptRequest {
    private String tituloProyecto;
    private String fechaInicio;
    private String fechaFin;
}
