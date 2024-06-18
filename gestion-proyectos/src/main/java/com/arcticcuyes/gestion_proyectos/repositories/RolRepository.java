package com.arcticcuyes.gestion_proyectos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long>{
    Rol findByRol(String rol);
}
