package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("JURIDICO")
public class ClienteNatural extends Cliente {

    @Column(nullable = false)
    private String razonSocial;

    @Column(nullable = false, unique = true, length = 11)
    private char ruc;
}
