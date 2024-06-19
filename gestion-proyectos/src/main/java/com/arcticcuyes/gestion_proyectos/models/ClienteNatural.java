package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("NATURAL")
public class ClienteNatural extends Cliente {

    @Basic
    private String nombre;

    @Basic
    private String apellido;

    @Column(nullable = true, unique = true, length = 8)
    private String dni;
}
