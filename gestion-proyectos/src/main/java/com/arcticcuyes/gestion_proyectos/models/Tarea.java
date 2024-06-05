package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name="TAREA")
public class Tarea {
    @Id
    @Column(name="id_tarea")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idTarea;

    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_inicio")
    private Timestamp fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_fin")
    private Timestamp fechaFin;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "tarea")
    private List<SubTarea> subTareas;

    @OneToMany(mappedBy = "tareaAsociada")
    private List<Recurso> recursos;

    @OneToOne(optional = true)
    @JoinColumn(name="id_tarea_anterior", referencedColumnName = "id_tarea", nullable = true)
    private Tarea tareaAnterior;

    @ManyToMany
    @JoinTable(name="ASIGNACION", 
        joinColumns = @JoinColumn(name="id_tarea"), 
        inverseJoinColumns = @JoinColumn(name="id_participante")
    )
    private List<Participante> participantesAsignados;
}
