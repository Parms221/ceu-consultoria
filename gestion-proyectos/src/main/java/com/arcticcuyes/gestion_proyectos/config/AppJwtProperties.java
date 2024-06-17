package com.arcticcuyes.gestion_proyectos.config;

import java.time.Duration;

import javax.crypto.SecretKey;

import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.validator.constraints.time.DurationMin;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.OctetSequenceKey;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Validated
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class AppJwtProperties {
    @NonNull
    private SecretKey key;

    @NotEmpty
    private String issuer;

    @NonNull
    private JWSAlgorithm algorithm;

    @NonNull
    @Min(1)
    private int expiresIn;

    public void setAlgorithm(String algorithm) {
        this.algorithm = JWSAlgorithm.parse(algorithm);
    }

    public void setKey(String key) {
        var jwk = new OctetSequenceKey.Builder(key.getBytes())
                .algorithm(algorithm)
                .build();

        this.key = jwk.toSecretKey();
    }
}
