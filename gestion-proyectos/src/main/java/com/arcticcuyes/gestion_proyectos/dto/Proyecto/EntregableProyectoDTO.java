package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import com.arcticcuyes.gestion_proyectos.models.Proyecto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntregableProyectoDTO {

    private Long idEntregableProyecto;

    private Proyecto proyecto;

    private Long entregableServicio;
}
