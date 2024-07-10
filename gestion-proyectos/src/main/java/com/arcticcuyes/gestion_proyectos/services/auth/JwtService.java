package com.arcticcuyes.gestion_proyectos.services.auth;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.security.UsuarioAuth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt.key}")
    private String SECRET_KEY;
    @Value("${app.jwt.expiresIn}")
    private String EXPIRES_IN;
    @Value("${app.jwt.issuer}")
    private String ISSUER;


    public String getToken(UsuarioAuth userAuth){
        Map<String, Object> datosAdicionales = new HashMap<String, Object>();
        datosAdicionales.put("nombre", userAuth.getUsuario().getName());
        datosAdicionales.put("email", userAuth.getUsername());
        datosAdicionales.put("roles", userAuth.getUsuario().getRoles());
        return generateToken(datosAdicionales, userAuth);
    }

    private String generateToken(Map<String, Object> claims, UsuarioAuth userAuth){
        Instant now = Instant.now();
        final int expiresIn = Integer.parseInt(EXPIRES_IN);
        return Jwts.builder()
            .subject(String.valueOf(userAuth.getUsuario().getId()))
            .claims(claims)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expiresIn, ChronoUnit.DAYS)))
            .issuer(ISSUER)
            .signWith(getSecretKey())
        .compact();
    }

    private SecretKey getSecretKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getEmailFromToken(String token) {
        return getClaim(token, claims -> claims.get("email", String.class));
    }

    public boolean isTokenValid(String token, UsuarioAuth usuario) {
        final String email = getEmailFromToken(token);
        return email.equals(usuario.getUsername()) && !isTokenExpired(token);
    }

    private Claims getAllClaims(String token){
        return Jwts.parser().verifyWith(getSecretKey())
        .build().parseSignedClaims(token).getPayload();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token){
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }
}
