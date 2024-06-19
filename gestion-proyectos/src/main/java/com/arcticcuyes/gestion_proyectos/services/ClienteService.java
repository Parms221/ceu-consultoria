package com.arcticcuyes.gestion_proyectos.services;

import com.arcticcuyes.gestion_proyectos.dto.ClienteJuridicoDto;
import com.arcticcuyes.gestion_proyectos.dto.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteJuridicoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteNaturalRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ClienteNaturalRepository clienteNaturalRepository;

    @Autowired
    private ClienteJuridicoRepository clienteJuridicoRepository;


    public Page<ClienteNatural> findAll(Pageable pageable) {
        return clienteNaturalRepository.findAll(pageable);
    }

    public Page<ClienteNatural> findAllClientesNaturales(Pageable pageable) {
        return clienteNaturalRepository.findAll(pageable);
    }

    public Page<ClienteJuridico> findAllClientesJuridicos(Pageable pageable) {
        return clienteJuridicoRepository.findAll(pageable);
    }

    public ClienteNatural saveClienteNatural(ClienteNaturalDto clienteNaturalDto) {
        ClienteNatural clienteNatural = new ClienteNatural();
        clienteNatural.setNombre(clienteNaturalDto.getNombre());
        clienteNatural.setApellido(clienteNaturalDto.getApellido());
        clienteNatural.setDni(clienteNaturalDto.getDni());
        clienteNatural.setEmail(clienteNaturalDto.getEmail());
        clienteNatural.setTelefono(clienteNaturalDto.getTelefono());
        clienteNatural.setTipo_documento(clienteNaturalDto.getTipo_documento());
        return clienteNaturalRepository.save(clienteNatural);
    }

    public ClienteJuridico saveClienteJuridico(ClienteJuridicoDto clienteJuridicoDto) {
        ClienteJuridico clienteJuridico = new ClienteJuridico();
        clienteJuridico.setRazonSocial(clienteJuridicoDto.getRazonSocial());
        clienteJuridico.setRuc(clienteJuridicoDto.getRuc());
        clienteJuridico.setEmail(clienteJuridicoDto.getEmail());
        clienteJuridico.setDireccion(clienteJuridicoDto.getDireccion());
        clienteJuridico.setTelefono(clienteJuridicoDto.getTelefono());
        clienteJuridico.setTipo_documento(clienteJuridicoDto.getTipo_documento());
        return clienteJuridicoRepository.save(clienteJuridico);
    }

    public void deleteClienteNatural(Long id) {
        clienteNaturalRepository.deleteById(id);
    }

    public void deleteClienteJuridico(Long id) {
        clienteJuridicoRepository.deleteById(id);
    }
}
