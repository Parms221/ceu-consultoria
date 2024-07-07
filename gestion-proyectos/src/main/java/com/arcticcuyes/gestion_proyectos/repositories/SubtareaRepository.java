package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.SubTarea;
import com.arcticcuyes.gestion_proyectos.models.Tarea;

@Repository
public interface SubtareaRepository extends CrudRepository<SubTarea, Long> {
    List<SubTarea> findByTarea(Tarea tarea);
}
