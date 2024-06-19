package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;

@Repository
public interface EntregableServicioRepository extends CrudRepository<EntregableServicio, Long>, PagingAndSortingRepository<EntregableServicio, Long>{

}
