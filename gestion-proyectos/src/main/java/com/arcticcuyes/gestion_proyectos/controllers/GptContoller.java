package com.arcticcuyes.gestion_proyectos.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arcticcuyes.gestion_proyectos.controllers.dao.GptRequest;
import com.arcticcuyes.gestion_proyectos.services.GptService;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/gpt")
public class GptContoller {
    @Autowired
    private GptService gptService;
    
    @PostMapping(path = "/test", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postMethodName(@RequestBody GptRequest gptRequest) {
        String res =  gptService.getOpenAiResponse(gptRequest.getTituloProyecto(), gptRequest.getFechaInicio(), gptRequest.getFechaFin());
        return ResponseEntity.ok(res);
    }

    
    
}
