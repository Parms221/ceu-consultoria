package com.arcticcuyes.gestion_proyectos.dto.Consultor;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ConsultorDto {
    @NotEmpty(message = "El nombre es obligatorio")
    private String nombres;

    @NotEmpty(message = "El apellido es obligatorio")
    private String apellidos;

    @Pattern(regexp = "M|F", message = "Solo se acepta M o F")
    private char genero;

    // pattern -> "Marketing, Desarrollo, Diseño", osea, palabras separadas por comas
    @Pattern(regexp = "([a-zA-Z]+,\\s*)*", message = "Solo se aceptan palabras separadas por comas")
    private String especialidades;




}
