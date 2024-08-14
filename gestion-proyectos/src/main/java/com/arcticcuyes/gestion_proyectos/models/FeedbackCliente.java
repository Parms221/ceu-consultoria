package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="FEEDBACK_CLIENTE")
public class FeedbackCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_proyecto", referencedColumnName = "id_proyecto", nullable = true)
    @JsonIgnore
    private Proyecto proyecto; // Relación uno a uno con Proyecto

    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private boolean registrado = false;

    @Column(columnDefinition = "TEXT")
    private String calificaciones;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    public void setCalificaciones(List<Long> calificaciones) {
        if (calificaciones == null || calificaciones.isEmpty()) {
            this.calificaciones = null; // o un valor por defecto, como ""
        } else {
            this.calificaciones = calificaciones.stream()
                                                 .map(String::valueOf)
                                                 .collect(Collectors.joining(","));
        }
    }

    public List<Long> getCalificaciones() {
    if (this.calificaciones == null || this.calificaciones.isEmpty()) {
        return new ArrayList<>(); // Retorna una lista vacía en lugar de null
    }
    return Arrays.stream(this.calificaciones.split(","))
                 .map(Long::valueOf)
                 .collect(Collectors.toList());
}
}
