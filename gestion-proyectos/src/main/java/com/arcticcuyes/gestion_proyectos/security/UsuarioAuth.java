package com.arcticcuyes.gestion_proyectos.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.services.CustomUserDetailsService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class UsuarioAuth implements UserDetails {
    private Usuario usuario; 

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return usuario.getRoles()
            .stream()
            .map(rol -> new SimpleGrantedAuthority(rol.getRol()))
            .collect(Collectors.toList());
        // throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
    }

    @Override
    public String getPassword() {
        return usuario.getPassword();
    }

    @Override
    public String getUsername() {
        return usuario.getEmail();
    }

    @Override
    public boolean isEnabled() {
        return usuario.isEnabled();
    }

    public Usuario getUsuario() {
        return usuario;
    }
}
