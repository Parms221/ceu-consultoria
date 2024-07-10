package com.arcticcuyes.gestion_proyectos.runners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableServicioRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ServicioRepository;

import jakarta.transaction.Transactional;

@Service
public class ServiciosEntregablesRunnerService {
    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private EntregableServicioRepository entregableServicioRepository;

    @Transactional
    public void createServiciosYEntrgables(){
        
        if(servicioRepository.count() <= 0){
            Servicio servicio1 = servicioRepository.save(new Servicio("Asesorías Estratégicas y Técnicas", "Se realiza asesorías"));
            Servicio servicio2 = servicioRepository.save(new Servicio("Capacitación y Entrenamiento", "Se realiza capacitaciones"));
            Servicio servicio3 = servicioRepository.save(new Servicio("Tercerización de procesos", "Se realiza terceros"));
            Servicio servicio4 = servicioRepository.save(new Servicio("Desarrollo de Soluciones", "Se realiza por practicantes"));

            entregableServicioRepository.save(new EntregableServicio("Asesoría", servicio1));
            entregableServicioRepository.save(new EntregableServicio("Estrategia", servicio1));
            entregableServicioRepository.save(new EntregableServicio("Reporte final", servicio1));

            entregableServicioRepository.save(new EntregableServicio("Plan de capacitación", servicio2));
            entregableServicioRepository.save(new EntregableServicio("Capacitación", servicio2));

            entregableServicioRepository.save(new EntregableServicio("Mapeo de procesos actuales", servicio3));
            entregableServicioRepository.save(new EntregableServicio("Planificación de terceriazación", servicio3));
            entregableServicioRepository.save(new EntregableServicio("Acuerdos de niveles de servicio", servicio3));
            entregableServicioRepository.save(new EntregableServicio("Rendimiento", servicio3));

            entregableServicioRepository.save(new EntregableServicio("Product Backlog", servicio4));
            entregableServicioRepository.save(new EntregableServicio("Solución", servicio4));
        }
    }
}
