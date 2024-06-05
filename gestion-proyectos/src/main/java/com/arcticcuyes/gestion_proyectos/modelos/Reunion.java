package com.arcticcuyes.gestion_proyectos.modelos;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="REUNION")
public class Reunion {
    @Id
    @Column(name="id_reunion")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idReunion;

    @Column(nullable = false, length = 50)
    private String titulo;

    @Column(nullable = false)
    private String enlace;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_inicio", nullable = false)
    private Timestamp fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_fin")
    private Timestamp fechaFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_proyecto", referencedColumnName = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;
}
