package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubtareaDTO {
    private Long id;
    private String descripcion;
    private boolean completado;
}
