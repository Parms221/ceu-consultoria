package com.arcticcuyes.gestion_proyectos.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false)
    private Double precio = 0d;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "servicio")
    private List<EntregableServicio> entregablesDelServicio;
}
