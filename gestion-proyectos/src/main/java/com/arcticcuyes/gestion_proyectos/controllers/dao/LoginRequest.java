package com.arcticcuyes.gestion_proyectos.controllers.dao;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest{
    @NotBlank
    @Email
    String email;
    
    @NotBlank
    String password;
}
