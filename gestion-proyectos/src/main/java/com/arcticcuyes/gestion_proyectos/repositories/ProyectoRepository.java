package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;
import java.util.List;


@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, Long>{
    List<Proyecto> findByEstado(Estado estado);
    List<Proyecto> findAllByEstadoIdEstado(Long idEstado);

    Page<Proyecto> findAllBy(PageRequest pageRequest);
    Page<Proyecto> findProyectoByTituloContainingIgnoreCase(String titulo, PageRequest pageRequest);
}