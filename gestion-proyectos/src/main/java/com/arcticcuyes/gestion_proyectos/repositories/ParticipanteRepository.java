package com.arcticcuyes.gestion_proyectos.repositories;

import com.arcticcuyes.gestion_proyectos.models.Estado;
import com.arcticcuyes.gestion_proyectos.models.Participante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ParticipanteRepository extends CrudRepository<Participante, Long>{
}