package com.arcticcuyes.gestion_proyectos.config;

import java.security.spec.KeySpec;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration;
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
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.authentication.logout.DelegatingServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler;

import com.arcticcuyes.gestion_proyectos.utils.SecretKeyUtils;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig{

    private final AppJwtProperties appJwtProperties;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(t -> t.disable())
            .authorizeHttpRequests(request -> 
                request
                    .requestMatchers("/login").permitAll()
                    .requestMatchers( "/usuarios/**", "rols/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2-> oauth2.jwt(Customizer.withDefaults()))
            .sessionManagement(t -> t.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        //Por ahora, no
        // return new BCryptPasswordEncoder();
        return new StandardPasswordEncoder();
    }

    

    @Bean
    JwtDecoder jwtDecoder() {
        // try {
        //     SecretKey secretKey = SecretKeyUtils.getKeyFromPassword(secretString, saltString);    
        //     return NimbusJwtDecoder.withSecretKey(secretKey).build();
        // } catch (Exception e) {
        //     e.printStackTrace();
        // }
        return NimbusJwtDecoder.withSecretKey(appJwtProperties.getKey()).build();
    }

    // @Bean
    // JwtEncoder jwtEncoder() {
    //     try {
    //         SecretKey secretKey = SecretKeyUtils.getKeyFromPassword(secretString, saltString);    
    //         JWK jwk = new OctetSequenceKey.Builder(secretKey.getEncoded())
    //             .keyID(UUID.randomUUID().toString())
    //             .algorithm(JWSAlgorithm.HS256)
    //             .issueTime(new Date()).build();
        
    //         JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
    //         return new NimbusJwtEncoder(jwks);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    //     return null;
        
    // }
}
