package com.arcticcuyes.gestion_proyectos.controllers.google;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Reunion.ReunionDTO;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;
import com.arcticcuyes.gestion_proyectos.services.ReunionService;
import com.arcticcuyes.gestion_proyectos.services.google.GoogleMeetService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/reuniones")
public class ReunionController {
   
    
    @Autowired
    private GoogleMeetService gMeetService;

    @Autowired
    private ReunionService reunionService;

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<?> listAllMeetings() {
        return ResponseEntity.ok(reunionService.listAll());
    }

    @GetMapping("proyecto/{idProyecto}")
    public ResponseEntity<?> ListByProyecto(@PathVariable Long idProyecto) {
        try{
            Proyecto proyecto = proyectoService.findProyectoById(idProyecto);
            if(proyecto == null){
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(reunionService.findByProject(proyecto));
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    

    @PostMapping("proyecto/{idProyecto}")
    public ResponseEntity<?> createReunion(
        @AuthenticationPrincipal UsuarioAuth usuario,
        @RequestBody @Valid ReunionDTO reunionDTO, 
        @PathVariable Long idProyecto) {
        try{
            Proyecto proyecto = proyectoService.findProyectoById(idProyecto);
            if(proyecto == null){
                return ResponseEntity.notFound().build();
            }
            System.out.println("Creando reunión");
            reunionService.create(proyecto, reunionDTO, usuario);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/spaces")
    public ResponseEntity<?> postMethodName(@AuthenticationPrincipal UsuarioAuth usuario) {
        try {
            return ResponseEntity.ok(gMeetService.createSpace(usuario.getUsuario().getId()));
        }catch(Exception e){
            Map<String, String> errors = new HashMap<>();
            errors.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errors);
        }
    }
    
    
}
