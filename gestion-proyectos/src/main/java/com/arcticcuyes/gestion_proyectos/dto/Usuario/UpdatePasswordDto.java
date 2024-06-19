package com.arcticcuyes.gestion_proyectos.dto.Usuario;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UpdatePasswordDto {
    @NotEmpty(message = "La contraseña actual es obligatoria")
    private String currentPassword;

    @NotEmpty(message = "La nueva contraseña es obligatoria")
    private String newPassword;
}
