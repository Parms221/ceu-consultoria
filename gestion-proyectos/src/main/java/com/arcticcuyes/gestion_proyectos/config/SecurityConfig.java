package com.arcticcuyes.gestion_proyectos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.authentication.logout.DelegatingServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(t -> t.disable())
            .authorizeHttpRequests(request -> 
                request
                    .requestMatchers( "/usuarios/**", "rols/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .logout(t-> t.logoutSuccessUrl("/").clearAuthentication(true).permitAll())
            .sessionManagement(t -> t.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        //Por ahora, no
        // return new BCryptPasswordEncoder();
        return new StandardPasswordEncoder();
    }
}
