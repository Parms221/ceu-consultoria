package com.arcticcuyes.gestion_proyectos.services;

import java.io.File;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arcticcuyes.gestion_proyectos.exception.InvalidApiResponseException;
import com.arcticcuyes.gestion_proyectos.exception.gpt.GptResponseValidator;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
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
    private Resource functionCronogramaJsonFile;

    private String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    
    public JsonNode getOpenAiResponse(Proyecto proyecto){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("OpenAI-Organization", organizationId);
        headers.set("OpenAI-Project", projectId);
        String request = buildRequest(proyecto);

        // retornar { error : "error al construir la petición" }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode errorNode = objectMapper.createObjectNode();
        if(request == null) {
            errorNode.put("error", "No se pudo construir la petición");
            return errorNode;
        };

        HttpEntity<String> entity = new HttpEntity<>(request, headers);
        ResponseEntity<String> response = restTemplate.exchange(OPENAI_URL, HttpMethod.POST, entity, String.class);
    
        // Parsear la respuesta para devolver solo lo que nos interesa
        JsonNode parsedResponse = parseResponse(response.getBody());

        try {
            GptResponseValidator.validateApiResponse(parsedResponse);
        } catch (InvalidApiResponseException e){
            errorNode.put("error", e.getMessage());
            return errorNode;
        }

        return parsedResponse;
    }

    private String buildRequest(Proyecto proyecto) {
        ObjectMapper objectMapper = new ObjectMapper(); 
        ObjectNode jsonNode = objectMapper.createObjectNode();
        jsonNode.put("model", apiModel);
        jsonNode.putArray("messages")
            .addObject()
            .put("role", "user")
            .put("content", "Devuélveme un JSON planificando el cronograma de un proyecto en base al título y entregables que brindamos. El título del proyecto es: " + proyecto.getTitulo()+ 
                ". Plantea hitos, tareas, uno o más consultores responsables según su especialidad y subtareas para el proyecto mencionado; tomar en cuenta que se debe plantear para cada entregable un hito con el mismo nombre. "
                + "El proyecto empieza en "+proyecto.getFechaInicio()+" y termina en "+proyecto.getFechaLimite()
                +". El servicio es "+ proyecto.getServicio().getTitulo()+" y sus entregables son: "+ proyecto.getServicio().getEntregablesDelServicio().stream().map(
                    entregable -> entregable.getTitulo()).collect(Collectors.joining(", "))
                + ". Los consultores del proyecto son: "+ proyecto.getParticipantes().stream().map(
                    participante -> participante.getConsultorParticipante().getNombres() + " (id: "+participante.getIdParticipante()+")" +" (especialidad: " + participante.getConsultorParticipante().getEspecialidades()+ ")").collect(Collectors.joining(", "))
                +"."
                );
                
        System.out.println("jsonNode: "+jsonNode.get("messages").get(0).get("content").asText());
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
