package com.arcticcuyes.gestion_proyectos.repositories;

import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteJuridicoRepository extends CrudRepository<ClienteJuridico, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM cliente WHERE dtype = 'JURIDICO' and ruc = :ruc")
    ClienteJuridico findByRuc(@Param("ruc") String ruc);
}
