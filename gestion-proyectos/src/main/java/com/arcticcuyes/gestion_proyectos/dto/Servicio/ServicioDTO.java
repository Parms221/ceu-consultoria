package com.arcticcuyes.gestion_proyectos.dto.Servicio;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioDTO {
    
    @NotEmpty(message = "El título del Servicio es obligatorio")
    private String titulo;

    @NotEmpty(message = "La descripción del Servicio es obligatoria")
    private String descripcion;

    @NotEmpty(message = "La lista de entregables del Servicio no puede estar vacía")
    @Valid
    private List<EntregableServicioDTO> entregablesDelServicio;

}
