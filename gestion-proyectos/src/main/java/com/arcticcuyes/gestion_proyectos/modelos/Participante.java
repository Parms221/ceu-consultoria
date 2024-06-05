package com.arcticcuyes.gestion_proyectos.modelos;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="PARTICIPANTE")
public class Participante {
    @Id
    @Column(name="id_participante")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idParticipante;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_proyecto", referencedColumnName = "id_proyecto")
    private Proyecto proyectoIngresado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_consultor", referencedColumnName = "id_consultor")
    private Consultor consultorParticipante;

    @ManyToMany(mappedBy = "participantesAsignados")
    List<Tarea> tareas;
}
