package com.arcticcuyes.gestion_proyectos.services;

import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteJuridicoDto;
import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.models.Cliente;
import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteJuridicoRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteNaturalRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ClienteNaturalRepository clienteNaturalRepository;

    @Autowired
    private ClienteJuridicoRepository clienteJuridicoRepository;


    public List<Cliente> findAll() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    public List<ClienteNatural> findAllClientesNaturales() {
        return (List<ClienteNatural>) clienteNaturalRepository.findAll();
    }

    public List<ClienteJuridico> findAllClientesJuridicos() {
        return (List<ClienteJuridico>) clienteJuridicoRepository.findAll();
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

    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }

    public ClienteJuridico findClienteJuridicoById(Long id) {
        return clienteJuridicoRepository.findById(id).orElse(null);
    }

    public ClienteNatural findClienteNaturalById(Long id) {
        return clienteNaturalRepository.findById(id).orElse(null);
    }

    public void updateClienteJuridico(ClienteJuridico cliente, ClienteJuridicoDto clienteJuridicoDto) {
        cliente.setRazonSocial(clienteJuridicoDto.getRazonSocial());
        cliente.setRuc(clienteJuridicoDto.getRuc());
        cliente.setEmail(clienteJuridicoDto.getEmail());
        cliente.setDireccion(clienteJuridicoDto.getDireccion());
        cliente.setTelefono(clienteJuridicoDto.getTelefono());
        cliente.setTipo_documento(clienteJuridicoDto.getTipo_documento());
        clienteJuridicoRepository.save(cliente);
    }

    public void updateClienteNatural(ClienteNatural cliente, ClienteNaturalDto clienteNaturalDto) {
        cliente.setNombre(clienteNaturalDto.getNombre());
        cliente.setApellido(clienteNaturalDto.getApellido());
        cliente.setDni(clienteNaturalDto.getDni());
        cliente.setEmail(clienteNaturalDto.getEmail());
        cliente.setTelefono(clienteNaturalDto.getTelefono());
        cliente.setTipo_documento(clienteNaturalDto.getTipo_documento());
        clienteNaturalRepository.save(cliente);
    }
}
