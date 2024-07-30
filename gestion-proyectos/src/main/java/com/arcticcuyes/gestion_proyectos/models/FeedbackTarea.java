package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="FEEDBACK_TAREA")
public class FeedbackTarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_consultor", referencedColumnName = "id_consultor", nullable = false)
    private Consultor consultor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_tarea", referencedColumnName = "id_tarea", nullable = false)
    @JsonIgnore
    private Tarea tarea;

    @Column(columnDefinition = "TEXT")
    private String mensaje;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;
}
