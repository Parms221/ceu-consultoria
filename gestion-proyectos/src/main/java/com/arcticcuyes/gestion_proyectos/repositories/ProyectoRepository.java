package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Proyecto;

@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, Long>, PagingAndSortingRepository<Proyecto, Long>{

}