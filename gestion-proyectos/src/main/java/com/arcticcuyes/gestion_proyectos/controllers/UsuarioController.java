package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Usuario.UpdatePasswordDto;
import com.arcticcuyes.gestion_proyectos.dto.Usuario.UpdateUsuarioDto;
import com.arcticcuyes.gestion_proyectos.dto.Usuario.UsuarioDto;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
 import com.arcticcuyes.gestion_proyectos.services.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Secured({"ROLE_ADMIN"})
    public List<Usuario> index(){
        return usuarioService.getUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUserById(@PathVariable long id){
        Usuario usuario = usuarioService.findById(id);
        if(usuario != null){
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario create(@RequestBody @Valid UsuarioDto usuarioDto){
        return usuarioService.create(usuarioDto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody @Valid UpdateUsuarioDto newUsuarioDto){
        System.out.println("ID: " + newUsuarioDto);
        Usuario found = usuarioService.findById(id);
        if (found != null){
            usuarioService.updateUsuario(found, newUsuarioDto);
            return new ResponseEntity<>("Usuario actualizado", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}/password")
    public ResponseEntity<String> updatePassword(@PathVariable long id, @RequestBody @Valid UpdatePasswordDto newUsuarioDto){
        Usuario found = usuarioService.findById(id);
        if (found != null){
           try {
                usuarioService.updatePassword(found, newUsuarioDto);
                return new ResponseEntity<>("Contraseña actualizada", HttpStatus.OK);
            } catch (Exception e){
                System.out.println("Error capturado ************" + e.getMessage());
                return new ResponseEntity<>("Contraseña actual incorrecta", HttpStatus.NOT_MODIFIED);
            }
        }
        else {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        if(usuarioService.findById(id) != null){
            usuarioService.delete(id);
            return new ResponseEntity<>("Usuario eliminado", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
    }
}
