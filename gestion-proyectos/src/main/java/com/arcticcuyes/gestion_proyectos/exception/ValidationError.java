package com.arcticcuyes.gestion_proyectos.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ValidationError extends RuntimeException{
    private final String field;
    private final String message;

    public ValidationError(String message, String field) {
        super(message);
        this.message = message;
        this.field = field;
    }
}
