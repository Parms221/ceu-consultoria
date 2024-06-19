package com.arcticcuyes.gestion_proyectos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ClienteNaturalDto {
    @NotEmpty(message = "El nombre es obligatorio")
    private String nombre;

    @NotEmpty(message = "El apellido es obligatorio")
    private String apellido;

    @NotEmpty(message = "El DNI es obligatorio")
    @Size(min = 8, max = 8, message = "El DNI debe tener 8 digitos")
    private String dni;

    @Email(message = "El email no es válido")
    private String email;

    @Size(min = 9, max = 9, message = "El telefono debe tener 9 digitos")
    private String telefono;
    @Pattern(regexp = "RUC|DNI", message = "Solo se acepta RUC o DNI")
    private String tipo_documento;
}
