package com.arcticcuyes.gestion_proyectos.services.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
        String token = null;
        String mensaje;
        UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        try{
            Authentication auth = authenticationManager.authenticate(authReq);
            token = jwtService.getToken((UsuarioAuth) auth.getPrincipal());
            mensaje = "Autorizado";
        }catch(BadCredentialsException e){
            mensaje = "Correo o contraseña incorrectos";
        }catch(DisabledException e){
            mensaje = "Usuario deshabilitado";
        }catch(Exception e){
            mensaje = "Error inesperado";
        }
        
        return new AuthResponse(token, mensaje);
    }

    public Usuario register(Usuario usuario){
        usuarioRepo.save(usuario);
        return usuario;
    }

}
