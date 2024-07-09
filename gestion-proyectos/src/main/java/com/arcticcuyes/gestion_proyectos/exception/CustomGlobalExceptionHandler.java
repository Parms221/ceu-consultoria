package com.arcticcuyes.gestion_proyectos.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomGlobalExceptionHandler {

    // Manejar las excepciones de validación
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> customValidationErrorHandling(MethodArgumentNotValidException exception) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", "VALIDATION_ERRORS");
        ArrayList<Map<String, Object>> errors = new ArrayList<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.add(Map.of("field", fieldName, "message", errorMessage));
        });
        body.put("errors", errors);

        // Devolver una respuesta con el mensaje de error
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationError.class)
    public ResponseEntity<Map<String, Object>> customValidationErrorHandlingLocal(ValidationError exception) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", "VALIDATION_ERRORS");
        ArrayList<Map<String, Object>> errors = new ArrayList<>();
        String fieldName = exception.getField();
        String errorMessage = exception.getMessage();
        errors.add(Map.of("field", fieldName, "message", errorMessage));
        body.put("errors", errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> customIntegrityViolationHandling(DataIntegrityViolationException exception) {
        // recuperar field value de la excepción
        String value = exception.getMostSpecificCause().getMessage();
        Map<String, String> response = new HashMap<>();
        response.put("message", value);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
