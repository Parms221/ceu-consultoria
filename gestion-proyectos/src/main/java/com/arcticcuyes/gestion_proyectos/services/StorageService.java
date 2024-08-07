package com.arcticcuyes.gestion_proyectos.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.models.Cliente;
import com.arcticcuyes.gestion_proyectos.models.EntregableProyecto;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableProyectoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ProyectoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.RecursoRepository;


@Service
public class StorageService {
    @Value("${files.dir.path}")
    private String filesDirPath;

    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private EntregableProyectoRepository entregableProyectoRepository;

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
        "application/pdf",
        "image/jpeg",
        "image/png",
        "video/mp4",
        "text/plain",
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel xlsx
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word docx
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PowerPoint pptx
        "application/zip",
        "x-zip-compressed",
        "application/vnd.rar",
        "application/x-7z-compressed"
    );

    //Zona de trabajo y entregables
    public Recurso uploadFilesRelatedToProject(MultipartFile file, Long idProyecto, Long idEntregableProyecto, Usuario usuario) {
        if(!isSupportedContentType(file.getContentType())){
            return null;
        }

        if(file.getSize() > 20_000_000){
            return null;
        }

        String dirPath;
        Proyecto proyecto;
        EntregableProyecto entregableProyecto = null;

        if(idEntregableProyecto == null){
            proyecto = proyectoRepository.findById(idProyecto).orElse(null);
            if(proyecto == null) return null;

            dirPath = filesDirPath + "/proyectos/" + proyecto.getIdProyecto() +" - "+proyecto.getTitulo();

        }else{
            entregableProyecto = entregableProyectoRepository.findById(idEntregableProyecto).orElse(null);
            if(entregableProyecto == null) return null;
            proyecto = entregableProyecto.getProyecto();

            dirPath = filesDirPath + "/entregables/" + proyecto.getIdProyecto() +"-"+proyecto.getTitulo();
        }

        String filePath = guardarArchivo(file, dirPath);

        if(filePath == null) return null;

        Recurso recursoNuevo = null;
        recursoNuevo = new Recurso(file.getOriginalFilename(), filePath, true, true, usuario, proyecto, entregableProyecto);
        recursoRepository.saveAndFlush(recursoNuevo);

        return recursoNuevo;
    }

    public Recurso uploadClientFiles(MultipartFile file, Cliente cliente, Usuario usuario) {
        if(!isSupportedContentType(file.getContentType())){
            return null;
        }

        if(file.getSize() > 10_000_000){
            return null;
        }

        String dirPath = filesDirPath + "/clientes/" + cliente.getIdCliente();

        String filePath = guardarArchivo(file, dirPath);

        if(filePath == null) return null;

        Recurso recursoNuevo = new Recurso(dirPath, filePath, true, true, usuario, cliente);
        recursoRepository.saveAndFlush(recursoNuevo);

        return recursoNuevo;
    }

    public Resource descargarRecurso(Recurso recurso){
        Path filePath = Paths.get(recurso.getEnlace()).normalize();
        System.out.println("Filepath: "+filePath);
        Resource resource;

        try {
            resource = new UrlResource(filePath.toUri());    
            if (!resource.exists()) {
                System.out.println("Recurso no encontrado");
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        System.out.println("Recurso encontrado y url asignado");
        return resource;
    }

    public String getContentType(Recurso recurso){
        Path filePath = Paths.get(recurso.getEnlace()).normalize();
        String contentType;
        try {
            contentType = Files.probeContentType(filePath);
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }

        return contentType;
    }

    private boolean isSupportedContentType(String contentType) {
        return ALLOWED_CONTENT_TYPES.contains(contentType);
    }

    private String guardarArchivo(MultipartFile file, String dirPath){
        try{
            Files.createDirectories(Paths.get(dirPath));
            String filePath = dirPath + "/" + file.getOriginalFilename();
            System.out.println(filePath);
            file.transferTo(new File(filePath));

            return filePath;
        }catch(Exception ex){
            System.out.println("Error al guardar archivo: "+ex.getMessage());
            System.out.println(ex.getStackTrace());
            return null;
        }
    }
}
