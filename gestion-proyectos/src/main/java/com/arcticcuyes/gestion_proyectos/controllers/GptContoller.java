package com.arcticcuyes.gestion_proyectos.controllers;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.GptRequest;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.services.GptService;
import com.arcticcuyes.gestion_proyectos.services.ProyectoService;
import com.arcticcuyes.gestion_proyectos.services.ServicioService;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/ia")
public class GptContoller {
    @Autowired
    private GptService gptService;

    @Autowired
    private ProyectoService proyectoService;
    
    @PostMapping(path = "/test", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> postMethodName(@RequestBody GptRequest gptRequest) {
        System.out.println("idProyecto: " + gptRequest.getIdProyecto());
        final Proyecto proyecto;
        try {
            proyecto = proyectoService.findProyectoById(gptRequest.getIdProyecto());    
        } catch (Exception e) {
            // return ResponseEntity.badRequest().body("Proyecto no encontrado");
        }

        Proyecto proyecto22 = new Proyecto();
        proyecto22.setTitulo("Proyecto de desarrollo web de plataforma de Boletos para Turismo Estrella");
        proyecto22.setDescripcion("Se necesita plataforma digital para gestionar los boletas de viaje de la empresa");
        try {
            proyecto22.setFechaInicio(new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("15/07/2024").getTime()));    
            proyecto22.setFechaLimite(new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("27/12/2024").getTime()));    
        } catch (Exception e) {
            // TODO: handle exception
        }
        System.out.println("FechaInicio: "+proyecto22.getFechaInicio());
        proyecto22.setPrecio(1000d);
        proyecto22.setCliente(new ClienteNatural());
        Servicio serv = new Servicio("Desarrollo de software", "");
        proyecto22.setServicio(serv);
        List<EntregableServicio> entregables = Arrays.asList(
            new EntregableServicio("Product Backlog", serv), 
            new EntregableServicio("Diseños del sistema", serv), 
            new EntregableServicio("Sistema", serv));
        serv.setEntregablesDelServicio(entregables);
        proyecto22.setEstado(new Estado("a", 0));
        proyecto22.setEntregables(null);
        Consultor consultor1 = new Consultor();
        consultor1.setIdConsultor(3);
        consultor1.setNombres("Juan");
        consultor1.setEspecialidades("Project Manager");
        Consultor consultor2 = new Consultor();
        consultor2.setIdConsultor(4);
        consultor2.setNombres("Maria");
        consultor2.setEspecialidades("Desarrollador");

        List<Participante> participantes = Arrays.asList(
            new Participante(9, null, proyecto22, consultor2, null), 
        new Participante(10, null, proyecto22, consultor1, null));
        proyecto22.setParticipantes(participantes);

        //Pasar proyecto a GPT
        JsonNode res =  gptService.getOpenAiResponse(proyecto22);

        // verificar si la respuesta tiene el key error
        if(res.has("error")){
            return ResponseEntity.internalServerError().body(res);
        }else {
            return ResponseEntity.ok(res);
        }
    }

    
    
}
