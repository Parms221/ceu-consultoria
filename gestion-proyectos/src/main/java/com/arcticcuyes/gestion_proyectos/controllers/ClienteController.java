package com.arcticcuyes.gestion_proyectos.controllers;

import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteJuridicoDto;
import com.arcticcuyes.gestion_proyectos.dto.Cliente.ClienteNaturalDto;
import com.arcticcuyes.gestion_proyectos.models.Cliente;
import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.services.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping()
    public List<Cliente> getAllClientes() {
        return clienteService.findAll();
    }

    @GetMapping("/naturales")
    public ResponseEntity<List<ClienteNatural>> getAllClientesNaturales() {
        List<ClienteNatural> clientes = clienteService.findAllClientesNaturales();
        return ResponseEntity.ok(clientes);
    }

    @PostMapping("/naturales/create")
    public ResponseEntity<ClienteNatural> createClienteNatural(@RequestBody @Valid ClienteNaturalDto clienteNaturalDto) {
        System.out.println(clienteNaturalDto);
        ClienteNatural createdCliente = clienteService.saveClienteNatural(clienteNaturalDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCliente);
    }


    @GetMapping("/juridicos")
    public ResponseEntity<List<ClienteJuridico>> getAllClientesJuridicos() {
        List<ClienteJuridico> cliente = clienteService.findAllClientesJuridicos();
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/juridicos/create")
    public ResponseEntity<ClienteJuridico> createClienteJuridico(@RequestBody @Valid ClienteJuridicoDto clienteJuridicoDto) {
        ClienteJuridico createdCliente = clienteService.saveClienteJuridico(clienteJuridicoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCliente);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }

}
