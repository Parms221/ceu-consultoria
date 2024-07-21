package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long>, PagingAndSortingRepository<Usuario, Long>{
    Usuario findByEmail(String email);
     

}
