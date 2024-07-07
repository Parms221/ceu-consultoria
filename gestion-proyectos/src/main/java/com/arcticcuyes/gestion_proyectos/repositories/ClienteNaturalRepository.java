package com.arcticcuyes.gestion_proyectos.repositories;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteNaturalRepository extends CrudRepository<ClienteNatural, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM cliente WHERE dtype ='NATURAL' and dni = :dni")
    ClienteNatural findByDni(@Param("dni") String dni);
}
