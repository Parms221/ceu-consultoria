package com.arcticcuyes.gestion_proyectos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.models.Rol;
import com.arcticcuyes.gestion_proyectos.repositories.RolRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RolService {
    @Autowired
    private RolRepository rolRepository;
    
    public List<Rol> ListRoles(){
        return rolRepository.findAll();
    }
}
