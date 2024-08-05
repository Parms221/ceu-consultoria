package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.models.Usuario;

@Repository
public interface ConsultorRepository extends CrudRepository<Consultor, Long>{
    Consultor findByusuarioConsultor(Usuario usuario);
}
