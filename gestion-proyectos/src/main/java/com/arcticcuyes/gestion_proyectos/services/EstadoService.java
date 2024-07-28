package com.arcticcuyes.gestion_proyectos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.repositories.EstadoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EstadoService {
    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> findAll() {
        return (List<Estado>) estadoRepository.findAll();
    }

    public List<Estado> findEstadosTareas(){
        return estadoRepository.findByTipo(2);
    }

    public List<Estado> findEstadosProyectos(){
        return estadoRepository.findByTipo(1);
    }
}
