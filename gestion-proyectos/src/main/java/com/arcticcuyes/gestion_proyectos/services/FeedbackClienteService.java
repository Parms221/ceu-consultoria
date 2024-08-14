package com.arcticcuyes.gestion_proyectos.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Proyecto.FeedbackClienteDTO;
import com.arcticcuyes.gestion_proyectos.models.FeedbackCliente;
import com.arcticcuyes.gestion_proyectos.repositories.FeedbackClienteRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackClienteService {

    @Autowired
    private FeedbackClienteRepository feedbackClienteRepository;

    public FeedbackCliente updateFeedbackByProyectoId(Long proyectoId, FeedbackClienteDTO fClienteDTO) {
        Optional<FeedbackCliente> feedbackOpt = feedbackClienteRepository.findByProyecto_IdProyecto(proyectoId);
        if (feedbackOpt.isPresent()) {
            FeedbackCliente feedback = feedbackOpt.get();
            feedback.setCalificaciones(fClienteDTO.getCalificaciones());
            feedback.setRegistrado(true);
            //feedback.setRegistrado(fClienteDTO.isRegistrado());
            feedback.setComentario(fClienteDTO.getComentario());
            feedbackClienteRepository.save(feedback);
            return feedback;
        }
        return null;
    }

    public FeedbackCliente getFeedbackByProyectoId(Long proyectoId) {
        Optional<FeedbackCliente> feedbackOpt = feedbackClienteRepository.findByProyecto_IdProyecto(proyectoId);
        return feedbackOpt.orElse(null); // Retorna null si no se encuentra el feedback
    }

    // Método para calcular el porcentaje de satisfacción global
    public double calcularPorcentajeSatisfaccionGlobal() {
        // Obtener todos los registros de FeedbackCliente
        List<FeedbackCliente> feedbackList = feedbackClienteRepository.findAll();

        if (feedbackList.isEmpty()) {
            return 0.0; // No hay calificaciones para calcular el porcentaje
        }

        // Filtrar los registros que tienen el campo 'registrado' en true
        List<FeedbackCliente> feedbackRegistradoList = feedbackList.stream()
            .filter(feedback -> feedback.isRegistrado()) // Ajustar según cómo accedes al campo
            .collect(Collectors.toList());

        if (feedbackRegistradoList.isEmpty()) {
            return 0.0; // No hay calificaciones para calcular el porcentaje
        }

        // Obtener todas las calificaciones en un solo listado
        List<Long> todasCalificaciones = feedbackList.stream()
                .filter(feedback -> feedback.getCalificaciones() != null)
                .flatMap(feedback -> feedback.getCalificaciones().stream())
                .collect(Collectors.toList());

        if (todasCalificaciones.isEmpty()) {
            return 0.0; // No hay calificaciones para calcular el porcentaje
        }

        // Calcular la media de las calificaciones
        double sumaCalificaciones = todasCalificaciones.stream().mapToLong(Long::intValue).sum();
        double media = sumaCalificaciones / todasCalificaciones.size();

        // Convertir la media a un porcentaje (escala de 1 a 5 se convierte a 0-100%)
        double porcentajeSatisfaccion = ((media - 1) * 100) / 4;

        BigDecimal porcentajeDecimal = new BigDecimal(porcentajeSatisfaccion).setScale(2, RoundingMode.HALF_UP);

        return porcentajeDecimal.doubleValue();
    }
}
