package com.arcticcuyes.gestion_proyectos.dto.Proyecto;

import java.sql.Timestamp;
import java.util.List;

import com.arcticcuyes.gestion_proyectos.models.Cliente;
import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Hito;
import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.models.Tarea;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumenProyectoDTO {
    private Long idProyecto;
    private String titulo;
    private String descripcion;
    private String objetivos;
    private String requerimientos;
    private String indicaciones;
    private Timestamp fechaInicio;
    private Timestamp fechaLimite;
    private Double precio;
    private Cliente cliente;
    private Servicio servicio;
    private Estado estado;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    @JsonIgnore
    private List<Hito> hitos;

    private List<Participante> participantes;

    private Double progreso;

    // Caluclar el progreso en base a las tareas en total con estado completado / total de tareas
    public Double calcularProgreso() {
        double total = 0;
        double completados = 0;
        for (Hito hito: hitos){
            total += hito.getTareasDelHito().size();
            for (Tarea tarea : hito.getTareasDelHito()){
                if (tarea.getEstado().getDescripcion().equals("Hecho")){
                    completados++;
                }
            }
        }
        if(total == 0){
            progreso = 0.0;
        }else{
            progreso = (completados / total) * 100;
        }
        return progreso;
    }
}
