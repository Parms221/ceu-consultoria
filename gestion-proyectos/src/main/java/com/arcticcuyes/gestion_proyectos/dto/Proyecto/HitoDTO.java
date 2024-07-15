package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class HitoDTO {
    @Length(min = 80, max = 100)
    private String titulo;
    private Timestamp fechaInicio;
    private Timestamp fechaFinalizacion;
    private List<TareaDTO> tareas;
}

