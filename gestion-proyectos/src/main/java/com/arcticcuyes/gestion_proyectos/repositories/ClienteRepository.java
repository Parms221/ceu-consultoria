package com.arcticcuyes.gestion_proyectos.repositories;

import com.arcticcuyes.gestion_proyectos.models.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Long> {
}
