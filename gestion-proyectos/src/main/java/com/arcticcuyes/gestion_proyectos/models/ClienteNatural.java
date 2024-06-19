package com.arcticcuyes.gestion_proyectos.models;

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

    @Column()
    private String nombre;

    @Column()
    private String apellido;

    @Column()
    private String dni;
}
