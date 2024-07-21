package com.arcticcuyes.gestion_proyectos.runners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.repositories.EstadoRepository;

/**
 * EstadosRunnerService
 */
@Service
public class EstadosRunnerService {
    @Autowired
    private EstadoRepository estadoRepository;

    //Estado TIPO 1: De proyecto
    //Estado TIPO 2: De tarea
    @Transactional
    public void crearEstados(){
        if (estadoRepository.findByTipo(1).isEmpty()) {
            estadoRepository.save(new Estado("Propuesto", 1));
            estadoRepository.save(new Estado("En desarrollo", 1));
            estadoRepository.save(new Estado("Finalizado", 1));
            estadoRepository.save(new Estado("Cancelado", 1));
            estadoRepository.save(new Estado("Rechazado", 1));

        }

        if(estadoRepository.findByTipo(2).isEmpty()){
            estadoRepository.save(new Estado("Por hacer", 2));
            estadoRepository.save(new Estado("En progreso", 2));
            estadoRepository.save(new Estado("Hecho", 2));
        }
    }
    
}