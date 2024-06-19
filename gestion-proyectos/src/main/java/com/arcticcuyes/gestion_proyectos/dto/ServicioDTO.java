package com.arcticcuyes.gestion_proyectos.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioDTO {
    private String titulo;
    private Double precio;
    private String descripcion;
    private List<EntregableServicioDTO> entregablesServicio;
}
