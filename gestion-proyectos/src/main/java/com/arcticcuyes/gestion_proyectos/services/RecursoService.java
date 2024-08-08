package com.arcticcuyes.gestion_proyectos.services;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.controllers.dao.RecursoEnlaceRequest;
import com.arcticcuyes.gestion_proyectos.models.EntregableProyecto;
import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.RecursoRepository;

@Service
public class RecursoService {
    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private ProyectoService proyectoService;

    @Autowired
    private StorageService storageService;

    public Recurso crearRecursoFile(MultipartFile multipartFile, Long idProyecto, Long idEntregableProyecto, Usuario user){
        System.out.println("idEntregableProyecto: " + idEntregableProyecto);
        Recurso recurso2 = storageService.uploadFilesRelatedToProject(
            multipartFile, 
            idProyecto, 
            idEntregableProyecto,
            user
        );
        return recurso2;
    }

    public Recurso crearRecursoLink(RecursoEnlaceRequest recursoEnlaceRequest, Usuario user){
        final EntregableProyecto entregable = recursoEnlaceRequest.getIdEntregableProyecto() == null ? null : proyectoService.getEntregableProyectoById(recursoEnlaceRequest.getIdEntregableProyecto());
        Recurso recurso = new Recurso(
                recursoEnlaceRequest.getTitulo(),
                recursoEnlaceRequest.getEnlace(),
                true,
                false,
                user,
                proyectoService.findProyectoById(recursoEnlaceRequest.getIdProyecto()),
                entregable
            );

        Recurso recurso2 = recursoRepository.save(recurso);
        return recurso2;
    }

    public List<Recurso> getAllRecursosByIdProyecto(Long idProyecto, Usuario user){
        if(user.getRoles().stream().map(rol -> rol.getRol()).toList().contains("ROLE_ADMIN")){
            return recursoRepository.findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(idProyecto);
        }

        List<Participante> participantes = proyectoService.getParticipantesProyecto(idProyecto);
        for (Participante part : participantes) {
            if(part.getConsultorParticipante().getUsuarioConsultor().getId() == user.getId()){
                return recursoRepository.findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(idProyecto);
            }
        }

        return null;
    }

    public Recurso getRecursoById(Long idRecurso, Usuario user){
        Recurso recurso = recursoRepository.findById(idRecurso).orElse(null);
        if(recurso == null){
            return null;
        }

        if(user.getRoles().stream().map(rol -> rol.getRol()).toList().contains("ROLE_ADMIN")){
            return recurso;
        }

        List<Participante> participantes = proyectoService.getParticipantesProyecto(recurso.getProyectoAsociado().getIdProyecto());
        for (Participante part : participantes) {
            if(part.getConsultorParticipante().getUsuarioConsultor().getId() == user.getId()){
                return recurso;
            }
        }
        return null;
    }

    public boolean eliminarRecurso(Recurso recurso, Usuario user){
        if(user.getRoles().stream().map(rol -> rol.getRol()).toList().contains("ROLE_ADMIN")){
            recursoRepository.deleteById(recurso.getIdRecurso());
            if(recurso.isEsArchivo()){
                storageService.eliminarArchivo(recurso.getEnlace());
            }
            return true;
        }

        List<Participante> participantes = proyectoService.getParticipantesProyecto(recurso.getProyectoAsociado().getIdProyecto());
        for (Participante part : participantes) {
            if(part.getConsultorParticipante().getUsuarioConsultor().getId() == user.getId()){
                recursoRepository.deleteById(recurso.getIdRecurso());
                if(recurso.isEsArchivo()){
                    storageService.eliminarArchivo(recurso.getEnlace());
                }
                return true;
            }
        }

        return false;
    }
}
