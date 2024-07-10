package com.arcticcuyes.gestion_proyectos.repositories;

import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteJuridicoRepository extends CrudRepository<ClienteJuridico, Long> {
    ClienteJuridico findByRuc(String ruc);
    boolean existsByRuc(String ruc);
}
