package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.arcticcuyes.gestion_proyectos.controllers.dao.StorageRequest;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.arcticcuyes.gestion_proyectos.services.RecursoService;
import com.arcticcuyes.gestion_proyectos.services.StorageService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
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
    public List<Recurso> getRecursosDeProyecto(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id, HttpServletRequest request) {
        List<Recurso> recursos = recursoService.getAllRecursosByIdProyecto(id, auth.getUsuario());
        System.out.println("Correcto");
        List<Recurso> recursos2 = recursos.stream().map(recurso -> {
            if(recurso.isEsArchivo()){
                // final String base = ServletUriComponentsBuilder.fromRequestUri(request).replacePath(null).build().toUriString();
                recurso.setEnlace(null);
            }
            recurso.setProyectoAsociado(null);
            return recurso;
        }).collect(Collectors.toList());
        System.out.println("Enviado");
        return recursos2;
    }

    @GetMapping("/{id}/{idRecurso}")
    public Recurso getRecurso(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id, @PathVariable Long idRecurso) {
        return recursoService.getRecursoById(idRecurso, id, auth.getUsuario());
    }

    @GetMapping("/download/{id}/{idRecurso}")
    public ResponseEntity<?> descargarRecurso(@AuthenticationPrincipal UsuarioAuth auth, @PathVariable Long id, @PathVariable Long idRecurso) {
        Recurso recurso = recursoService.getRecursoById(idRecurso, id, auth.getUsuario());
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
    
}
