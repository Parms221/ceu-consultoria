package com.arcticcuyes.gestion_proyectos.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.FeedbackClienteDTO;
import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.models.FeedbackCliente;
import com.arcticcuyes.gestion_proyectos.services.FeedbackClienteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/feedbackcli")

public class FeedbackClienteController {

    @Autowired
    private FeedbackClienteService feedbackClienteService;

    @GetMapping("/get/{id}")
    public ResponseEntity<FeedbackCliente> getFeedbackClienteById(@PathVariable Long id) {
        FeedbackCliente feedback = feedbackClienteService.getFeedbackByProyectoId(id);
        if (feedback == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    
    @PutMapping("/update/{id}")
    public ResponseEntity<FeedbackCliente> updateFeedbackCliente(@PathVariable Long id, @RequestBody @Valid FeedbackClienteDTO feedbackClienteDto) {
        FeedbackCliente fc = feedbackClienteService.updateFeedbackByProyectoId(id,feedbackClienteDto);
        return new ResponseEntity<>(fc, HttpStatus.OK);
    }

    @GetMapping("/satisfaccion")
    public double obtenerPorcentajeSatisfaccionGlobal() {
        return feedbackClienteService.calcularPorcentajeSatisfaccionGlobal();
    }

}
