package com.arcticcuyes.gestion_proyectos.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.config.AppJwtProperties;
import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenService {

    private final AppJwtProperties appJwtProperties;

    public String generateToken(UsuarioAuth auth){
        var key = appJwtProperties.getKey();
        var algorithm = appJwtProperties.getAlgorithm();

        var header = new JWSHeader(algorithm);

        Instant now = Instant.now();
        
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
            .issuer(appJwtProperties.getIssuer())
            .issueTime(Date.from(now))
            .expirationTime(Date.from(now.plus(1, ChronoUnit.WEEKS)))
            .subject(auth.getUsuario().getName())
            .claim("name", auth.getUsuario().getName())
            .claim("email", auth.getUsuario().getEmail())
            .claim("roles", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
            .build();

        SignedJWT jwt = new SignedJWT(header, claims);

        try{
            var signer = new MACSigner(key);
            jwt.sign(signer);
        }catch(JOSEException e){
            throw new RuntimeException("Unable to generate JWT", e);
        }

        return jwt.serialize();
    }
    

}
