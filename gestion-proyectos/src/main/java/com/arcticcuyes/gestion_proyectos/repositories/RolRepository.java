package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.repository.CrudRepository;

import com.arcticcuyes.gestion_proyectos.models.Rol;

public interface RolRepository extends CrudRepository<Rol, Long>{
    Rol findByRol(String rol);
}
