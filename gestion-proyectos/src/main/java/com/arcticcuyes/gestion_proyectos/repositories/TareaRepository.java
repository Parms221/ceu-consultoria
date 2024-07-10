package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Tarea;

@Repository
public interface TareaRepository extends CrudRepository<Tarea, Long> {

}
