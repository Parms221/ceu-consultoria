package com.arcticcuyes.gestion_proyectos.dto.Cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ClienteJuridicoDto {
    @NotEmpty(message = "La razon social es obligatorio")
    private String razonSocial;

    @NotEmpty(message = "El RUC es obligatorio")
    @Size(min = 11, max = 11, message = "El RUC debe tener 11 digitos")
    private char ruc;

    @Email(message = "El email no es válido")
    private String email;

    private String direccion;

    @Size(min = 9, max = 9, message = "El telefono debe tener 9 digitos")
    private String telefono;
    // solo RUC| DNI
    @Pattern(regexp = "RUC|DNI", message = "Solo se acepta RUC o DNI")
    private String tipo_documento;
}
