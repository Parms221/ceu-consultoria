package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackClienteDTO {
    private List<Long> calificaciones;
    //private boolean registrado;
    private String comentario;

}
