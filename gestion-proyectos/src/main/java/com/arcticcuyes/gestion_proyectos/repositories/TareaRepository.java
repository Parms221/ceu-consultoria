package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Tarea;

@Repository
public interface TareaRepository extends CrudRepository<Tarea, Long> {
    
    List<Tarea> findByHito(Hito hito);
}
