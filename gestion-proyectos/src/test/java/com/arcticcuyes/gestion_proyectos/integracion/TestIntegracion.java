package com.arcticcuyes.gestion_proyectos.integracion;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestIntegracion {

    @Autowired
    MockMvc mockMvc;

    private String token;

    @Test
    public void whenLoginIsSuccessful_thenTokenIsReturned() throws Exception {
        ResultActions test = mockMvc
                .perform(
                    post("/auth/login")
                    .content("{\"email\":\"admin@example.org\",\"password\":\"password\"}")
                    .contentType(MediaType.APPLICATION_JSON)
                );
        
        test.andExpect(status().isOk())
        .andExpect(jsonPath("$.token").exists()) // Contiene el token
        .andExpect(jsonPath("$.mensaje").value("Autorizado")); // Contiene el mensaje Autorizado

        String response = test.andReturn().getResponse().getContentAsString();
        this.token = response.replaceAll("\\s", "").
                              replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    public void getUsersWithToken_thenReturnsOk() throws Exception {
        System.out.println("Token en prueba de usuarios: " + this.token);
        mockMvc.perform(get("/usuarios").header(HttpHeaders.AUTHORIZATION, "Bearer " + this.token))
                .andExpect(status().isOk());
    }

    @Test
    public void getUsersWithoutToken_thenReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/usuarios"))
                .andExpect(status().isForbidden());
    }
}