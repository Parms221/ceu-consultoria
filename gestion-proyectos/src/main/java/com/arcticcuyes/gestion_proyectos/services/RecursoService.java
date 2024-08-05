package com.arcticcuyes.gestion_proyectos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.repositories.RecursoRepository;

@Service
public class RecursoService {
    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private StorageService storageService;

    public Recurso crearRecurso(MultipartFile multipartFile, Recurso recurso){
        if(recurso.isEsArchivo() && multipartFile != null){
            Recurso recurso2 = storageService.uploadFilesRelatedToProject(
            multipartFile, 
            recurso.getProyectoAsociado().getIdProyecto(), 
            recurso.getEntregableAsociado().getIdEntregableProyecto(),
            recurso.getPropietario());
            return recurso2;
        }
        
        Recurso recursoEnlace = recursoRepository.save(recurso);
        return recursoEnlace;
    }

    public List<Recurso> getAllRecursosByIdProyecto(Long idProyecto){
        return recursoRepository.findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(idProyecto);
    }
}
