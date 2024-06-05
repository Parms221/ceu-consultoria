package com.arcticcuyes.gestion_proyectos.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="ROL")
public class Rol {
    @Id
    @Column(name="id_rol")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRole;
    
    @Column(nullable = false)
    private String rol;

    @ManyToMany(mappedBy = "roles")
    private Set<Usuario> usuarios;
}
