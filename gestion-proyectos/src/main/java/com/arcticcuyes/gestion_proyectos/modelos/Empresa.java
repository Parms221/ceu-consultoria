package com.arcticcuyes.gestion_proyectos.modelos;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="EMPRESA")
public class Empresa {
    @Id
    @Column(name="id_empresa")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idEmpresa;

    @Column(name="razon", nullable = false, length = 80)
    private String razonSocial;

    @Column(nullable = false, length = 11)
    private char ruc;

    @Column(nullable = false, length = 80)
    private String direccion;
    
    @Column(nullable = false, length = 12)
    private String telefono;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;
}
