package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = true, length = 100)
    private String descripcion;

    @Column(nullable = false)
    private String enlace;

    // Si se crea el evento se obtienen las siguientes propiedades
    private String eventId;
    private String eventOrganizer;
    private String eventHtmlLink;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_inicio", nullable = false)
    private Timestamp fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fecha_fin")
    private Timestamp fechaFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_proyecto", nullable = false)
    @JsonBackReference
    private Proyecto proyecto;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "reunion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvitadoReunion> invitados;
}
