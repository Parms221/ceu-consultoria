package com.arcticcuyes.gestion_proyectos.services;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt.key}")
    private String SECRET_KEY;
    @Value("${app.jwt.expiresIn}")
    private String EXPIRES_IN;

    public String getToken(UsuarioAuth userAuth){
        return generateToken(new HashMap<String, Object>(), userAuth);
    }

    private String generateToken(Map<String, Object> claims, UsuarioAuth userAuth){
        Instant now = Instant.now();
        final int expiresIn = Integer.parseInt(EXPIRES_IN);
        return Jwts.builder()
            .claims(claims)
            .subject(String.valueOf(userAuth.getUsuario().getId()))
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expiresIn, ChronoUnit.DAYS)))
            .issuer("localhost")
            .signWith(getSecretKey())
        .compact();
    }

    private Key getSecretKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
