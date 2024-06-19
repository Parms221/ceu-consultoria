package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("JURIDICO")
public class ClienteJuridico extends Cliente {

    @Basic
    private String razonSocial;

    @Column(nullable = true, unique = true, length = 11)
    private char ruc;

    @Basic
    private String direccion;

    @OneToOne(mappedBy = "clienteJuridico", cascade = CascadeType.ALL)
    private Representante representante;
}
