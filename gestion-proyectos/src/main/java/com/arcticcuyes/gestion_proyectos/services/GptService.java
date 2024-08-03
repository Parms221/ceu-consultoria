package com.arcticcuyes.gestion_proyectos.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arcticcuyes.gestion_proyectos.controllers.dao.GptRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class GptService {

    @Value("${openai.api.model}")
    private String apiModel;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.organization.id}")
    private String organizationId;

    @Value("${openai.project.id}")
    private String projectId;

    @Value("classpath:jsons/function_cronograma.json")
    Resource functionCronogramaJsonFile;

    private String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    
    public JsonNode getOpenAiResponse(GptRequest gptRequest){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("OpenAI-Organization", organizationId);
        headers.set("OpenAI-Project", projectId);
        String request = buildRequest(gptRequest);

        // retornar { error : "error al construir la petición" }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode errorNode = objectMapper.createObjectNode();
        errorNode.put("error", "Error formateando la respuesta");
        if(request == null) return errorNode;

        HttpEntity<String> entity = new HttpEntity<>(request, headers);
        ResponseEntity<String> response = restTemplate.exchange(OPENAI_URL, HttpMethod.POST, entity, String.class);
    
        // Parsear la respuesta para devolver solo lo que nos interesa
        JsonNode parsedResponse = parseResponse(response.getBody());

        return parsedResponse;
    }

    private String buildRequest(GptRequest gptRequest) {
        ObjectMapper objectMapper = new ObjectMapper(); 
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("model", apiModel);
        jsonNode.putArray("messages")
            .addObject()
            .put("role", "user")
            .put("content", "Planifica el cronograma de un proyecto. El título del proyecto es: " + gptRequest.getTituloProyecto()+ 
                ". Plantea hitos, tareas y subtareas para el proyecto mencionado. El proyecto empieza en "+gptRequest.getFechaInicio()+" y termina en "+gptRequest.getFechaFin());
        
        JsonNode jsonNodeFunction;
        try{
            jsonNodeFunction = objectMapper.readTree(new File(functionCronogramaJsonFile.getURL().getPath())); 
        }catch(Exception e){
            e.printStackTrace();
            jsonNodeFunction = null;
            return null;
        }

        jsonNode.putArray("tools").add(jsonNodeFunction);
        jsonNode.put("tool_choice", "required");
        
        String jsonString = jsonNode.toString();

        return jsonString;
    }


    public JsonNode parseResponse(String body){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(body);
            JsonNode argumentsNode = jsonNode.path("choices").get(0)
                .path("message").path("tool_calls").get(0)
                .path("function").path("arguments");
            
            JsonNode parsedString = objectMapper.readTree(argumentsNode.asText());
            return parsedString;
        } catch (Exception e) {
            e.printStackTrace();
            ObjectNode errorNode = objectMapper.createObjectNode();
            errorNode.put("error", "Error formateando la respuesta");
            return errorNode;
        }
    }
}
