package com.arcticcuyes.gestion_proyectos.controllers;

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
import com.arcticcuyes.gestion_proyectos.services.StorageService;


//ES SOLO DE PRUEBA, NO IRA EN PRODUCCION
@RestController
@RequestMapping("/recurso")
public class RecursoController {

    @Autowired
    StorageService storageService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> subirRecurso(@AuthenticationPrincipal UsuarioAuth auth,  @RequestPart("file") MultipartFile file, @RequestPart("body") StorageRequest body){    
        System.out.println(body.getIdProyecto());
        Recurso recurso = storageService.uploadFile(file,body.getIdProyecto() , null, auth.getUsuario() );
        if(recurso == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(recurso);

    }
}
