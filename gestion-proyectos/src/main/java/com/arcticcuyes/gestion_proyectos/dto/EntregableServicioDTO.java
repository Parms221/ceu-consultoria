package com.arcticcuyes.gestion_proyectos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntregableServicioDTO {
    private Long id;
    private String titulo;
    private String descripcion;

}