package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;


@RestController
public class IndexController {
    @GetMapping({"/index"})
    public String index(@AuthenticationPrincipal UsuarioAuth auth) {
        return "Hello " + auth.getUsuario().getName();
    }
    
}
