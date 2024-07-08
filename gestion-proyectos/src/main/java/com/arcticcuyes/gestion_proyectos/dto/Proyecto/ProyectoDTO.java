package com.arcticcuyes.gestion_proyectos.dto.Proyecto;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.boot.autoconfigure.integration.IntegrationProperties.RSocket.Client;

import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteJuridicoDto;
import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.models.Hito;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoDTO {

    // Part Diagnostico
    private String tipoCliente;

    private long idCliente;

    // Part Alcance

    @NotEmpty(message = "El titulo del Proyecto es obligatorio")
    private String titulo;

    @NotEmpty(message = "La descripcion del Proyecto es obligatorio")
    private String descripcion;

    @NotEmpty(message = "Los objetivos del Proyecto son obligatorios")
    private String objetivos;

    @NotEmpty(message = "Los requerimientos del Proyecto son obligatorios")
    private String requerimientos;

    private String indicaciones;

    @NotNull(message = "La fecha de inicio del proyecto es obligatoria")
    private Timestamp fechaInicio;

    @NotNull(message = "La fecha límite del proyecto es obligatoria")
    private Timestamp fechaLimite;

    @NotNull(message = "El precio del Proyecto es necesario")
    private Double precio;


    @NotNull(message = "El servicio asociado al proyecto es obligatorio")
    private Long servicio;

    private Long estado = 1l;
    // private List<Participante> participantes;

    // private List<Reunion> reuniones;

    private List<HitoDTO> hitos;

    private List<EntregableProyectoDTO> entregables;
}
