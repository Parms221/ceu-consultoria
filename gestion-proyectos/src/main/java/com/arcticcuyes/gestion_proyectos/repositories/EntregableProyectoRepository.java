package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.EntregableProyecto;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;

import java.util.List;


@Repository
public interface EntregableProyectoRepository extends CrudRepository<EntregableProyecto, Long>{
    List<EntregableProyecto> findByProyecto(Proyecto proyecto);
}
