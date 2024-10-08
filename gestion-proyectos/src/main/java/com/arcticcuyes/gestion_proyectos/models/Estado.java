package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="ESTADO")
public class Estado {
    @Id
    @Column(name="id_estado")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idEstado;

    @Column(nullable = false, length = 20)
    private String descripcion;

    @Column(nullable = false)
    private int tipo;

    public Estado(String descripcion, int tipo) {
        this.descripcion = descripcion;
        this.tipo = tipo;
    }
}
