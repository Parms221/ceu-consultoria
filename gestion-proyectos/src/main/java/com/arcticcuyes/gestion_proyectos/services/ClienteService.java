package com.arcticcuyes.gestion_proyectos.services;

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

    public ClienteNatural saveClienteNatural(ClienteNatural clienteNatural) {
        return clienteNaturalRepository.save(clienteNatural);
    }

    public ClienteJuridico saveClienteJuridico(ClienteJuridico clienteJuridico) {
        return clienteJuridicoRepository.save(clienteJuridico);
    }

    public void deleteClienteNatural(Long id) {
        clienteNaturalRepository.deleteById(id);
    }

    public void deleteClienteJuridico(Long id) {
        clienteJuridicoRepository.deleteById(id);
    }
}
