package com.arcticcuyes.gestion_proyectos.controllers.dao;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoogleRequest {
    @NotEmpty(message = "El código de autorización es obligatorio")
    @NotNull(message = "El código de autorización es obligatorio")
    private String code;
}
