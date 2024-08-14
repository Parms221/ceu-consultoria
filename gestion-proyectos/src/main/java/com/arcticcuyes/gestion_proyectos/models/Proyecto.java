package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="PROYECTO")
public class Proyecto {
    @Id
    @Column(name="id_proyecto")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idProyecto;

    @Column(columnDefinition = "TEXT")
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(columnDefinition = "TEXT")
    private String objetivos;

    @Column(columnDefinition = "TEXT")
    private String requerimientos;

    @Column(columnDefinition = "TEXT")
    private String indicaciones;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_inicio", nullable = false)
    private Timestamp fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_limite", nullable = false)
    private Timestamp fechaLimite;

    @Column(nullable = false)
    private Double precio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_servicio")
    private Servicio servicio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_estado", nullable = false)
    private Estado estado;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "proyectoIngresado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participante> participantes;

    @OneToOne(mappedBy = "proyecto", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private FeedbackCliente feedbackCliente;

    @OneToMany(mappedBy = "proyecto")
    private List<Reunion> reuniones;

    @OneToMany(mappedBy = "proyecto")
    private List<Hito> hitos;

    @OneToMany(mappedBy = "proyecto", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EntregableProyecto> entregables;

    // @OneToMany(mappedBy = "proyectoAsociado")
    // private List<Recurso> recursos;
    @Override
    public String toString() {
        return "Proyecto{idProyecto=" + idProyecto + ", titulo='" + titulo + "'}";
    }
}
