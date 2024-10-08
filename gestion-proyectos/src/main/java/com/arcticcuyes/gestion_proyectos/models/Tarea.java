package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
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

    @Column(nullable = false, length = 100)
    private String titulo;

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

    @OneToOne(optional = true)
    @JoinColumn(name="id_tarea_anterior")
    private Tarea tareaAnterior;

    @ManyToOne(fetch = FetchType.EAGER)
    //@JoinColumn(name="id_estado", nullable = false)
    @JoinColumn(name="id_estado", nullable = true)
    private Estado estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_hito", nullable = false)
    @JsonIgnore
    private Hito hito;

    @ManyToMany
    @JoinTable(name="ASIGNACION", 
        joinColumns = @JoinColumn(name="id_tarea"), 
        inverseJoinColumns = @JoinColumn(name="id_participante")
    )
    private List<Participante> participantesAsignados = new ArrayList<>();

    @OneToMany(mappedBy = "tarea",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubTarea> subTareas;

    // Feedbacks
    @OneToMany(mappedBy = "tarea",cascade = CascadeType.ALL)
    @OrderBy("createdAt DESC")
    private List<FeedbackTarea> feedbacks;


}
