package com.arcticcuyes.gestion_proyectos.models;

import java.util.List;

import jakarta.persistence.*;
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

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL , orphanRemoval = true)
    private List<EntregableServicio> entregablesDelServicio;

    public Servicio(String titulo, String descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }    
}
