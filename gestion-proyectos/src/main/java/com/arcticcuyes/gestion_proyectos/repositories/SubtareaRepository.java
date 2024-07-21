package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.SubTarea;

@Repository
public interface SubtareaRepository extends CrudRepository<SubTarea, Long> {
    List<SubTarea> findByTarea_IdTarea(Long idTarea);
    void deleteAllByTarea_IdTarea(long idTarea);
}
