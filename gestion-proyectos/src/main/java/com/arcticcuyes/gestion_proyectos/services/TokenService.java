package com.arcticcuyes.gestion_proyectos.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;

    public TokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String generateToken(UsuarioAuth auth){
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("ECU")
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.WEEKS))
            .subject(auth.getUsuario().getName())
            .claim("name", auth.getUsuario().getName())
            .claim("email", auth.getUsuario().getEmail())
            .claim("roles", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
            .build();

        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
    

}
