package com.arcticcuyes.gestion_proyectos.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ENTREGABLE_SERVICIO")
public class EntregableServicio {
    @Id
    @Column(name="id_entregable_servicio")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idEntregableServicio;

    @Column(nullable = false, length = 50)
    private String titulo;

    // @Basic
    // private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_servicio", nullable = false)
    @JsonIgnore
    private Servicio servicio;
}
