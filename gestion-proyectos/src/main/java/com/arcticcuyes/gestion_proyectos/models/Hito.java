package com.arcticcuyes.gestion_proyectos.models;


import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(name="id_hito")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idHito;

    @Column(nullable = false, length = 50)
    private String titulo;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp fecha_finalizacion;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @OneToMany(mappedBy = "hito")
    private List<Tarea> tareasDelHito;
}
