package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;

@Repository
public interface ParticipanteRepository  extends CrudRepository<Participante, Long> {

        
    Set<Participante> findByProyectoIngresado(Proyecto proyecto); 

    List<Participante> findByConsultorParticipante_IdConsultorIn(Set<Long> consultorIds);

    List<Participante> findByConsultorParticipante_IdConsultorInAndProyectoIngresado_IdProyecto(Set<Long> consultorIds, Long proyectoId);

    // @Query("SELECT p FROM participante p WHERE p.id_consultor IN :consultorIds AND p.id_proyecto = :proyectoId")
    // List<Participante> findByConsultorIdInAndProyectoId(@Param("consultorIds") Set<Long> consultorIds, @Param("proyectoId") Long proyectoId);

}
