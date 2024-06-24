package com.arcticcuyes.gestion_proyectos.dto.Servicio;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntregableServicioDTO {

    private Long id;
    
    @NotEmpty(message = "El título del entregable es obligatorio")
    private String titulo;

    @NotEmpty(message = "La descripción del entregable es obligatoria")
    private String descripcion;


}