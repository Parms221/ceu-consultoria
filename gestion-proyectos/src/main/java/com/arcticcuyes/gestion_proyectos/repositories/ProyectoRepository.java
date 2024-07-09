package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import java.util.List;


@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, Long>{
    List<Proyecto> findByEstado(Estado estado);
    List<Proyecto> findAllByEstadoIdEstado(Long idEstado);
}