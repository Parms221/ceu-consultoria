package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("JURIDICO")
public class ClienteJuridico extends Cliente {

    @Column()
    private String razonSocial;

    @Column(unique = true, length = 11)
    private char ruc;

    @Column()
    private String direccion;

    @OneToOne(mappedBy = "clienteJuridico", cascade = CascadeType.ALL)
    private Representante representante;
}
