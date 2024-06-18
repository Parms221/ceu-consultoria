package com.arcticcuyes.gestion_proyectos.services;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.controllers.dao.AuthResponse;
import com.arcticcuyes.gestion_proyectos.controllers.dao.LoginRequest;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.UsuarioRepository;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication auth = authenticationManager.authenticate(authReq);
        UsuarioAuth aber = (UsuarioAuth) auth.getPrincipal();
        System.out.println("Uusario Auth: "+aber.getUsername() + " " + aber.getUsuario().getId());
        String token = jwtService.getToken((UsuarioAuth) auth.getPrincipal());
        return new AuthResponse(token);
    }

    public Usuario register(Usuario usuario){
        usuarioRepo.save(usuario);
        return usuario;
    }

}
