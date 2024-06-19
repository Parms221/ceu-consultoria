package com.arcticcuyes.gestion_proyectos.services;

import com.arcticcuyes.gestion_proyectos.models.Representante;
import com.arcticcuyes.gestion_proyectos.repositories.RepresentanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RepresentanteService {

    @Autowired
    private RepresentanteRepository representanteRepository;

    public Representante saveRepresentante(Representante representante) {
        return representanteRepository.save(representante);
    }

    public void deleteRepresentante(Long id) {
        representanteRepository.deleteById(id);
    }
}
