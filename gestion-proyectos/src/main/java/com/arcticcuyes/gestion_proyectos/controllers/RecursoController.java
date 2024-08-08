package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.controllers.dao.RecursoEnlaceRequest;
import com.arcticcuyes.gestion_proyectos.controllers.dao.StorageRequest;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;
import com.arcticcuyes.gestion_proyectos.services.RecursoService;
import com.arcticcuyes.gestion_proyectos.services.StorageService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/recursos")
public class RecursoController {

    @Autowired
    StorageService storageService;

    @Autowired
    RecursoService recursoService;

    @Autowired
    ProyectoService proyectoService;

    @PostMapping(path = "/file" , produces = "application/json")
    public ResponseEntity<?> subirRecursoFile(@AuthenticationPrincipal UsuarioAuth auth,  @RequestPart("file") MultipartFile file, @RequestPart("body") StorageRequest body){
        Recurso recurso = null;
        try {
            recurso = recursoService.crearRecursoFile(file, body.getIdProyecto(), body.getIdEntregableProyecto(), auth.getUsuario());    
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
        if(recurso == null){
            System.out.println("Error en recurso");
            return ResponseEntity.badRequest().body("Error al crear recurso");
        }
        return ResponseEntity.ok(recurso);
    }

    @PostMapping("/link")
    public ResponseEntity<?> subirRecurso(@AuthenticationPrincipal UsuarioAuth auth,  @RequestBody RecursoEnlaceRequest body){    
        System.out.println(body);
        Recurso recurso = recursoService.crearRecursoLink(body, auth.getUsuario());
        if(recurso == null){
            return ResponseEntity.badRequest().body("Error al crear recurso");
        }
        return ResponseEntity.ok(recurso);
    }

    @GetMapping("/project/{id}")
    public List<Recurso> getRecursosDeProyecto(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id) {
        List<Recurso> recursos = recursoService.getAllRecursosByIdProyecto(id, auth.getUsuario());
        List<Recurso> recursos2 = recursos.stream().map(recurso -> {
            if(recurso.isEsArchivo()){
                recurso.setEnlace(null);
            }
            recurso.setProyectoAsociado(null);
            return recurso;
        }).collect(Collectors.toList());
        return recursos2;
    }

    @GetMapping("/{id}")
    public Recurso getRecurso(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id) {
        return recursoService.getRecursoById(id, auth.getUsuario());
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> descargarRecurso(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id) {
        Recurso recurso = recursoService.getRecursoById(id, auth.getUsuario());
        if(recurso == null){
            return ResponseEntity.notFound().build();
        }
        Resource resource = storageService.descargarRecurso(recurso);
        if(resource == null){
            System.out.println("No encontrado RECURSO en descarga");
            return ResponseEntity.notFound().build();
        }
        String contentType = storageService.getContentType(recurso);
        System.out.println("Descargando");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarRecurso(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id) {
        Recurso recurso = recursoService.getRecursoById(id, auth.getUsuario());
        if(recurso == null){
            return ResponseEntity.notFound().build();
        }
        final boolean eliminadoDb = recursoService.eliminarRecurso(recurso, auth.getUsuario());
        if(!eliminadoDb){
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.noContent().build();
    }
    
}
