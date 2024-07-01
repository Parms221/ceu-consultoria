package com.arcticcuyes.gestion_proyectos.dto;


import java.sql.Timestamp;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoDTO {

    //private long idProyecto;
    @NotEmpty(message = "La descripcion del Proyecto es obligatorio")
    private String descripcion;

    @NotEmpty(message = "Los objetivos del Proyecto son obligatorios")
    private String objetivos;

    @NotEmpty(message = "Los requerimientos del Proyecto son obligatorios")
    private String requerimientos;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private Timestamp fechaInicio;

    @NotNull(message = "La fecha límite del proyecto es obligatoria")
    private Timestamp fechaLimite;

    @NotNull(message = "El precio del Proyecto es necesario")
    private Double precio;

    // private Timestamp createdAt;

    // private Timestamp updatedAt;

    //private Cliente cliente;

    // private Servicio servicio;

    // private Estado estado;
    // private List<Participante> participantes;

    // private List<Reunion> reuniones;

    // private List<Hito> hito;

    // private List<EntregableProyecto> entregables;
}
