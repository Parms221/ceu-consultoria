package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Recurso;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso,Long>{
    // List<Recurso> findByIdProyecto(Long idProyecto);    
    List<Recurso> findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(Long idProyecto);
    List<Recurso> findByEntregableAsociadoIdEntregableProyecto(Long idEntregableProyecto);
    // Optional<Recurso> findBy
}
