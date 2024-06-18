package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Usuario.UsuarioDto;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
 import com.arcticcuyes.gestion_proyectos.services.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public List<Usuario> index(){
        return usuarioService.getUsuarios();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario create(@RequestBody @Valid UsuarioDto usuarioDto){
        return usuarioService.create(usuarioDto);
    }

    @PutMapping("/update")
    public String update(){
        return "Usuario actualizado";
    }

    @DeleteMapping("/delete")
    public String delete(){
        return "Usuario eliminado";
    }
}
