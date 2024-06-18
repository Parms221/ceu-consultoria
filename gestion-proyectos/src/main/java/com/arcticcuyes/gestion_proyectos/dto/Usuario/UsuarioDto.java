package com.arcticcuyes.gestion_proyectos.dto.Usuario;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioDto {
    @NotEmpty(message = "El nombre es obligatorio")
    private String name;

    @NotEmpty(message = "El email es obligatorio")
    @Email(message = "El email no es válido")
    private String email;

    @NotEmpty(message = "La contraseña es obligatoria")
    private String password;

    @Size(min = 1, message = "Debe tener al menos un rol")
    private List<String> roles;
}
