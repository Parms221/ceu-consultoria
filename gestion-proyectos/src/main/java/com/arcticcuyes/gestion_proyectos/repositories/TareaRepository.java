package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Tarea;

@Repository
public interface TareaRepository extends CrudRepository<Tarea, Long> {
    List<Tarea> findByHito_IdHito(Long idHito);

    @Query(value="select t.* from asignacion a " + 
                "join tarea t on t.id_tarea  = a.id_tarea  " + 
                "join hito hi on t.id_hito  = hi.id_hito " + 
                "join proyecto proy on proy.id_proyecto  = hi.id_proyecto  " + 
                "join participante p on p.id_participante = a.id_participante  " + 
                "join consultor c on c.id_consultor = p.id_consultor  " + 
                "join usuario u on u.id = c.id_usuario  " + 
                "where u.id = :userId",
        nativeQuery = true
    )
    List<Tarea> findByUsuario(@Param("userId") Long userId);

    @Query(
        value = "select t.* from asignacion a " + 
                        "join tarea t on t.id_tarea  = a.id_tarea  " + 
                        "join hito hi on t.id_hito  = hi.id_hito " + 
                        "join proyecto proy on proy.id_proyecto  = hi.id_proyecto  " + 
                        "join participante p on p.id_participante = a.id_participante  " + 
                        "join consultor c on c.id_consultor = p.id_consultor  " + 
                        "join usuario u on u.id = c.id_usuario  " + 
                        "where u.id = :userId and proy.id = :proyectoId",
        nativeQuery = true
    )
    List<Tarea> findByParticipantesInProyecto(@Param("userId") Long userId, @Param("proyectoId") Long proyectoId);
}
