package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Recurso;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso,Long>{
    
}
