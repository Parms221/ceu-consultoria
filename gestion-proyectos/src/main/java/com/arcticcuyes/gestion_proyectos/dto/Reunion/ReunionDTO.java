package com.arcticcuyes.gestion_proyectos.dto.Reunion;

import java.sql.Timestamp;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReunionDTO {

    private Long idReunion;

    @NotEmpty(message = "El título no debe estar vacío")
    @NotNull(message = "El título del reunión es obligatorio")
    private String titulo;

    private String descripcion;

    // El enlace se genera al crear a través de Google API
    private String enlace;

    @NotNull(message = "La fecha de inicio del reunión es obligatoria")
    private Timestamp fechaInicio;
    @NotNull(message = "La fecha límite del reunión es obligatoria")
    private Timestamp fechaFin;

    private List<InvitadoDTO> invitados;

    private boolean crearEvento = true;
    private boolean enviarUpdates = false;
}
