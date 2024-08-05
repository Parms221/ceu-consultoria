package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Rol;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.EstadoService;
import com.arcticcuyes.gestion_proyectos.services.RolService;


@RestController
public class IndexController {
    @Autowired
    private EstadoService estadoService;
    @Autowired
    private RolService rolService;

    @GetMapping({"/home"})
    public String index(@AuthenticationPrincipal UsuarioAuth auth) {
        return "Hello " + auth.getUsuario().getName();
    }
    
    @GetMapping("/index")
    public ResponseEntity<?> indexData(){
        List<Rol> roles = rolService.ListRoles();
        List<Estado> estados = estadoService.findAll();
        //Return a JSON with inital data
        Map<String, Object> response  = new HashMap<>();
        response.put("roles", roles);
        response.put("estados", estados);
        return ResponseEntity.ok(response);
    }
}
