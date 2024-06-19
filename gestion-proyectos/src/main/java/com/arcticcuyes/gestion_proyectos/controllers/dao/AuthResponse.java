package com.arcticcuyes.gestion_proyectos.controllers.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
    String mensaje;
}
