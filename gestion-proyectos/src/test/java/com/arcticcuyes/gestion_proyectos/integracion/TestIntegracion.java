package com.arcticcuyes.gestion_proyectos.integracion;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.ProyectoDTO;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.services.TestProyectoData;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestIntegracion {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    private TestProyectoData testProyectoData;

    private String adminToken;
    private String consultorToken;

    // Caso de prueba 1
    @BeforeEach
    public void whenLoginIsSuccessful_thenTokenIsReturned() throws Exception {
        this.adminToken = loginWithCorrectCredentials("admin@example.org", "password");
        this.consultorToken = loginWithCorrectCredentials("consultor@example.org", "password");
    }

    private String loginWithCorrectCredentials(String email, String password) throws Exception {
        ResultActions test = mockMvc
                .perform(
                    MockMvcRequestBuilders.post("/auth/login")
                    .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}")
                    .contentType(MediaType.APPLICATION_JSON)
                );

        test.andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.token").exists()) // Contiene el token
            .andExpect(MockMvcResultMatchers.jsonPath("$.mensaje").value("Autorizado")); // Contiene el mensaje Autorizado

        String response = test.andReturn().getResponse().getContentAsString();
        return response.replaceAll("\\s", "")
                       .replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    // Caso de prueba 2
    @Test
    public void getUsersWithToken_thenReturnsOk() throws Exception {
        System.out.println("Token en prueba de usuarios: " + this.adminToken);
        mockMvc.perform(get("/proyectos").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.adminToken))
                .andExpect(status().isOk());
    }

    // Caso de prueba 3
    @Test
    public void getUsersWithoutToken_thenReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/usuarios"))
                .andExpect(status().isForbidden());
    }

    // Caso de prueba 4
    @Test
    public void getUsersWithIncorrectRole_thenReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/usuarios").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.consultorToken))
                .andExpect(status().isForbidden());
    }

    // Caso de prueba 5
    @Test
    public void getUsersWithCorrectRole_thenReturnsOk() throws Exception {
        mockMvc.perform(get("/usuarios").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.adminToken))
                .andExpect(status().isOk());
    }

    // Caso de prueba 6: prubea de flujo creación de proyecto  -> aceptación por administrador -> verificación de usuario cliente y login de cliente
    @Test
    public void whenCreateProject_thenReturnsOk() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Random random = new Random();
        String randomNumber9digits = String.format("%09d", random.nextInt(100000000));
        String randomDNI8digits = String.format("%08d", random.nextInt(10000000));

        // Prueba de endpoint para la creacción del cliente
        ClienteNaturalDto clienteDT = new ClienteNaturalDto("Nombre", "Apellidos", randomDNI8digits, "cliente@gmail.com", randomNumber9digits, "DNI");
        ResultActions createCliente = mockMvc.perform(post("/clientes/naturales/create").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.adminToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(clienteDT)))
            .andExpect(status().isCreated());

        String response = createCliente.andReturn().getResponse().getContentAsString();
        ClienteNatural newCliente = objectMapper.readValue(response, ClienteNatural.class);
        Long idNewCliente = newCliente.getIdCliente();
        
        // Creación del proyecto
        ProyectoDTO proyectoDTO = testProyectoData.createTestProyectoDTO(idNewCliente);
        
        ResultActions addProyecto = mockMvc.perform(
            post("/proyectos/addProyecto").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.consultorToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(proyectoDTO))
        ).andExpect(status().isCreated());
        String responseProyecto = addProyecto.andReturn().getResponse().getContentAsString();
        Long idProyecto = testProyectoData.getIdProyecto(responseProyecto);
        // Actualización del proyecto al estado en desarrollo para dar acceso al cliente
        Map<String, String> mapStatus = new HashMap<>();
        mapStatus.put("idEstado", "2");
        mockMvc.perform(
            post("/proyectos/propuestos/"+idProyecto)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + this.adminToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(mapStatus))
        ).andExpect(status().isOk());

        // Prueba de acceso del cliente
        loginWithCorrectCredentials(clienteDT.getEmail(), clienteDT.getDni());
    }
}