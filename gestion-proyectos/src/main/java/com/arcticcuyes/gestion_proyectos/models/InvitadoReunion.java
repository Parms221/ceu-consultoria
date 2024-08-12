package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

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

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="INVITADO_REUNION")
public class InvitadoReunion {
    @Id
    @Column(name = "id_invitado")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idInvitado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_reunion", nullable = false)
    @JsonIgnore
    private Reunion reunion;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    private String email;
    private boolean opcional;
    
}
