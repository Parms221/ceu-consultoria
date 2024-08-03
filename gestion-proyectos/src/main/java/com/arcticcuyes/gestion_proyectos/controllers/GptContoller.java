package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.GptRequest;
import com.arcticcuyes.gestion_proyectos.services.GptService;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/ia")
public class GptContoller {
    @Autowired
    private GptService gptService;
    
    @PostMapping(path = "/test", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> postMethodName(@RequestBody GptRequest gptRequest) {
        System.out.println("titulo: " + gptRequest.getTituloProyecto());
        JsonNode res =  gptService.getOpenAiResponse(gptRequest);

        // verificar si la respuesta tiene el key error
        if(res.has("error")){
            return ResponseEntity.internalServerError().body(res);
        }else {
            return ResponseEntity.ok(res);
        }
    }

    
    
}
