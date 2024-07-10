package com.arcticcuyes.gestion_proyectos.repositories;

import com.arcticcuyes.gestion_proyectos.models.Representante;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepresentanteRepository extends CrudRepository<Representante, Long> {
}