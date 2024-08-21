package com.arcticcuyes.gestion_proyectos.services;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.HitoDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.ProyectoDTO;
import com.arcticcuyes.gestion_proyectos.dto.Proyecto.TareaDTO;

@Service
public class TestProyectoData {
    public ProyectoDTO createTestProyectoDTO(Long idCliente) throws Exception {
        ProyectoDTO proyectoDTO = new ProyectoDTO();
        proyectoDTO.setTitulo("Proyect de prueba");
        proyectoDTO.setDescripcion("Descripcion del proyecto");
        proyectoDTO.setEstado(1l);
        proyectoDTO.setIdCliente(idCliente);
        proyectoDTO.setObjetivos("Objetivos del proyecto");
        proyectoDTO.setRequerimientos("Requerimientos del proyecto");
        proyectoDTO.setPrecio(1200.00);
        proyectoDTO.setServicio(1l);
        proyectoDTO.setFechaInicio(geTimestamp("15/07/2024"));
        proyectoDTO.setFechaLimite(geTimestamp("27/12/2024"));
        List<HitoDTO> hitos = new ArrayList<>();
        HitoDTO hitoDTO = new HitoDTO();
        hitoDTO.setTitulo("Hito 1");
        hitoDTO.setFechaInicio(geTimestamp("15/07/2024"));
        hitoDTO.setFechaFinalizacion(geTimestamp("27/12/2024"));
        List<TareaDTO> tareas = new ArrayList<>();
        TareaDTO tareaDTO = new TareaDTO();
        tareaDTO.setTitulo("Título de la tarea");
        tareaDTO.setDescripcion("Tarea 1");
        tareaDTO.setEstado(6l);
        tareaDTO.setFechaInicio(geTimestamp("15/07/2024"));
        tareaDTO.setFechaFin(geTimestamp("27/12/2024"));
        hitoDTO.setTareas(tareas);
        proyectoDTO.setHitos(hitos);
        return proyectoDTO;
    }

    public Long getIdProyecto(String proyectoResponse) throws Exception {
        Pattern pattern = Pattern.compile("\"idProyecto\":(\\d+)");
        Matcher matcher = pattern.matcher(proyectoResponse);
        if (matcher.find()) {
            return Long.parseLong(matcher.group(1));
        } else {
            throw new Exception("No se pudo obtener el id del proyecto");
        }
    }

    private Timestamp geTimestamp(String fecha) throws Exception {
        return new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse(fecha).getTime());
    }
}
