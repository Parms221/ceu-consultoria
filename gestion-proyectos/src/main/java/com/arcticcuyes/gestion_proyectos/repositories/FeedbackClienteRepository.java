package com.arcticcuyes.gestion_proyectos.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arcticcuyes.gestion_proyectos.models.FeedbackCliente;

@Repository
public interface FeedbackClienteRepository extends JpaRepository<FeedbackCliente, Long> {
    Optional<FeedbackCliente> findByProyecto_IdProyecto(Long proyectoId);
}
