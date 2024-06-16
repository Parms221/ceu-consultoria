package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ENTREGABLE_PROYECTO")
public class EntregableProyecto {
    @Id
    @Column(name="id_entregable_proyecto")
    private long idEntregableProyecto;

    @ManyToOne
    @JoinColumn(name="id_proyecto", nullable = false)
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name="id_entregable_servicio", nullable = false)
    private EntregableServicio entregableServicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_entregada")
    private Timestamp fechaEntregada;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;
}
