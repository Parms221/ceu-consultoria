package com.arcticcuyes.gestion_proyectos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.arcticcuyes.gestion_proyectos.config.AppJwtProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppJwtProperties.class)
public class PlataformaDeGestionDeProyectosApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlataformaDeGestionDeProyectosApplication.class, args);
	}

}
