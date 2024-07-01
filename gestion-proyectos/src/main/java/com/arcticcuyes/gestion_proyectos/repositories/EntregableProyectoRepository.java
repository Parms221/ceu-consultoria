package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.EntregableProyecto;

@Repository
public interface EntregableProyectoRepository extends CrudRepository<EntregableProyecto, Long>{

}
