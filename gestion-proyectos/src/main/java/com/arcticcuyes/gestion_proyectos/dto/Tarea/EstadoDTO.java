package com.arcticcuyes.gestion_proyectos.dto.Tarea;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoDTO {
    @NotNull(message = "El estado es obligatorio")
    private Long idEstado;
}
