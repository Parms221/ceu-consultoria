package com.arcticcuyes.gestion_proyectos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@PropertySources({
    @PropertySource("classpath:openai.properties")
})
public class OpenAIProperties {
    
}
