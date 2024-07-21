package com.arcticcuyes.gestion_proyectos.models;


import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name="HITO")
public class Hito {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id_hito")
    private long idHito;

    @Column(nullable = false, length = 50)
    private String titulo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_inicio")
    private Timestamp fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_finalizacion", nullable = false)
    private Timestamp fechaFinalizacion;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_proyecto", nullable = false)
    @JsonIgnore
    private Proyecto proyecto;

    @OneToMany(mappedBy = "hito",cascade = CascadeType.ALL)
    private List<Tarea> tareasDelHito;

   
}
