package com.arcticcuyes.gestion_proyectos.services.errors;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ArchivoYaExisteException extends RuntimeException{
    public ArchivoYaExisteException(String message, Throwable err){
        super(message, err);
    }
}
