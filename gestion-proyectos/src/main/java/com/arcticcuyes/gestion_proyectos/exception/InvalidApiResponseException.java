package com.arcticcuyes.gestion_proyectos.exception;

public class InvalidApiResponseException extends RuntimeException{
        public InvalidApiResponseException(String message) {
            super(message);
        }
}
