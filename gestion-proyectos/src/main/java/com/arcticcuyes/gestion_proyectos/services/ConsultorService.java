package com.arcticcuyes.gestion_proyectos.services;

import com.arcticcuyes.gestion_proyectos.dto.Consultor.ConsultorDto;
import com.arcticcuyes.gestion_proyectos.exception.ValidationError;
import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.ConsultorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ConsultorService {

    @Autowired
    private ConsultorRepository consultorRepository;

    public List<Consultor> findAll() {
        return (List<Consultor>) consultorRepository.findAll();
    }
    public Consultor findConsultorById(Long id) {
        return consultorRepository.findById(id).orElse(null);
    }

    public Consultor findConsultorByUser(Usuario usuario) {
        return consultorRepository.findByusuarioConsultor(usuario);
    }

    public Optional<Consultor> findById(Long id) {
        return consultorRepository.findById(id);
    }

    public Consultor saveConsultor(ConsultorDto consultorDto) throws ValidationError {
        Consultor consultor = new Consultor();
        consultor.setNombres(consultorDto.getNombres());
        consultor.setApellidos(consultorDto.getApellidos());
        consultor.setGenero(consultorDto.getGenero());
        consultor.setEspecialidades(consultorDto.getEspecialidades());
        return consultorRepository.save(consultor);
    }

    public void deleteConsultor(Long id) {
        consultorRepository.deleteById(id);
    }
    public void updateConsultor(Consultor consultor, ConsultorDto consultorDto) {
        consultor.setNombres(consultorDto.getNombres());
        consultor.setApellidos(consultorDto.getApellidos());
        consultor.setGenero(consultorDto.getGenero());
        consultor.setEspecialidades(consultorDto.getEspecialidades());
        consultorRepository.save(consultor);
    }
}
