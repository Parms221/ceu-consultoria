package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="CONSULTOR")
public class Consultor {
    @Id
    @Column(name="id_consultor")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idConsultor;

    @Column(nullable = true, length = 50)
    private String nombres;
    @Column(nullable = true, length = 50)
    private String apellidos;
    @Column(nullable = true)
    private char genero;

    @Column(columnDefinition = "TEXT")
    private String especialidades;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_usuario", unique = true, nullable = false)
    private Usuario usuarioConsultor;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;

    @Override
    public String toString() {
        return "Consultor{idConsultor=" + idConsultor + ", nombres='" + nombres + "'}";
    }

}
