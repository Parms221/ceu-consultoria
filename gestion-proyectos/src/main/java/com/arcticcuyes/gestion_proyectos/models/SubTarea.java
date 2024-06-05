package com.arcticcuyes.gestion_proyectos.models;

import jakarta.persistence.Basic;
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

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="SUBTAREA")
public class SubTarea {
    @Id
    @Column(name="id_subtarea")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idSubTarea;

    @Column(nullable = false, length = 50)
    private String titulo;

    @Basic
    private boolean completado = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_tarea", referencedColumnName = "id_tarea", nullable = false)
    private Tarea tarea;
}
