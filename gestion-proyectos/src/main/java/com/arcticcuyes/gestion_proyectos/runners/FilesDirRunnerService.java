package com.arcticcuyes.gestion_proyectos.runners;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service

public class FilesDirRunnerService {
    @Value("${files.dir.path}")
    private String filesDirPath;

    public void createFilesDir(){
        String filesProyectoDirPath = filesDirPath+"/proyectos";
        String filesClienteDirPath = filesDirPath+"/clientes";
        String filesEntregableDirPath = filesDirPath+"/entregables";

        try{
            System.out.println("Creando directorio de archivos");
            Files.createDirectories(Paths.get(filesProyectoDirPath));
            Files.createDirectories(Paths.get(filesClienteDirPath));
            Files.createDirectories(Paths.get(filesEntregableDirPath));
            System.out.println("Creado");
        }catch(IOException e){
            System.out.println("Error al crear directorio: "+e.getMessage());
        }
        
    }
}
