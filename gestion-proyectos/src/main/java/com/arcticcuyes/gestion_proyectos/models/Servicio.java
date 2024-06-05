package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="SERVICIO")
public class Servicio {
    @Id
    @Column(name="id_servicio")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idServicio;

    @Column(nullable = false, length = 50)
    private String titulo;
}
