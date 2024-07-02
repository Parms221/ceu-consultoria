package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import java.util.List;


/**
 * EstadoRepository
 */
@Repository
public interface EstadoRepository extends CrudRepository<Estado, Long>{
    List<Estado> findByTipo(int tipo);
    
}
