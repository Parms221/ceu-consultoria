package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Proyecto;

@Repository
public interface ParticipanteRepository  extends CrudRepository<Participante, Long> {

        
    List<Participante> findByProyectoIngresado(Proyecto proyecto); 

    List<Participante> findByConsultorParticipante_IdConsultorIn(List<Long> consultorIds);

    List<Participante> findByConsultorParticipante_IdConsultorInAndProyectoIngresado_IdProyecto(List<Long> consultorIds, Long proyectoId);

    Optional<Participante> findByIdParticipanteAndProyectoIngresado_IdProyecto(Long id, Long proyectoId);

    // @Query("SELECT p FROM participante p WHERE p.id_consultor IN :consultorIds AND p.id_proyecto = :proyectoId")
    // List<Participante> findByConsultorIdInAndProyectoId(@Param("consultorIds") List<Long> consultorIds, @Param("proyectoId") Long proyectoId);

}
