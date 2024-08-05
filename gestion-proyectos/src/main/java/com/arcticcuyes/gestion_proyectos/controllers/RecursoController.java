package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.controllers.dao.StorageRequest;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.RecursoService;
import com.arcticcuyes.gestion_proyectos.services.StorageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



//ES SOLO DE PRUEBA, NO IRA EN PRODUCCION
@RestController
@RequestMapping("/recursos")
public class RecursoController {

    @Autowired
    StorageService storageService;

    @Autowired
    RecursoService recursoService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> subirRecurso(@AuthenticationPrincipal UsuarioAuth auth,  @RequestPart("file") MultipartFile file, @RequestPart("body") StorageRequest body){    
        System.out.println(body.getIdProyecto());
        Recurso recurso = storageService.uploadFilesRelatedToProject(file,body.getIdProyecto() , null, auth.getUsuario() );
        if(recurso == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(recurso);
    }

    @GetMapping("/{id}")
    public List<Recurso> getRecursosDeProyecto(@PathVariable Long id) {
        List<Recurso> recursos = recursoService.getAllRecursosByIdProyecto(id);
        System.out.println("Correcto");
        List<Recurso> recursos2 = recursos.stream().map(recurso -> {
            if(recurso.isEsArchivo()){
                recurso.setEnlace(null);
            }
            recurso.setProyectoAsociado(null);
            recurso.setPropietario(null);
            return recurso;
        }).collect(Collectors.toList());
        System.out.println("Enviado");
        return recursos2;
    }
    
}
