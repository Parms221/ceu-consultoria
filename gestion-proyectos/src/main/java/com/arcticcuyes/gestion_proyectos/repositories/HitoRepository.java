package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;


public interface HitoRepository extends CrudRepository<Hito,Long>{
    List<Hito> findByProyecto(Proyecto proyecto);
}
