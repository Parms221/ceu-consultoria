package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
@Table(name="CLIENTE")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Cliente {
    @Id
    @Column(name="id_cliente")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idCliente;

    @Column(nullable = false, length = 12)
    private String telefono;

    @Column(nullable = false)
    @Email()
    private String email;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_usuario", unique = true)
    private Usuario usuarioCliente;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp(source = SourceType.DB)
    @Column(name="updated_at", insertable = false)
    private Timestamp updatedAt;

}
