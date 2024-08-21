package com.arcticcuyes.gestion_proyectos.dto.Servicio;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntregableServicioDTO {

    private Long id;
    
    private String titulo;

    // @NotEmpty(message = "La descripción del entregable es obligatoria")
    // private String descripcion;
    public EntregableServicioDTO(String titulo) {
        this.titulo = titulo;
    }
}