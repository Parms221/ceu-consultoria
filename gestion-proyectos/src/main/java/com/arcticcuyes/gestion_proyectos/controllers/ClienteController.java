package com.arcticcuyes.gestion_proyectos.controllers;

import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/")
    public ResponseEntity<Page<ClienteNatural>> getAllClientes(Pageable pageable) {
        Page<ClienteNatural> page = clienteService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/naturales")
    public ResponseEntity<Page<ClienteNatural>> getAllClientesNaturales(Pageable pageable) {
        Page<ClienteNatural> page = clienteService.findAllClientesNaturales(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/naturales")
    public ResponseEntity<ClienteNatural> createClienteNatural(@RequestBody ClienteNatural clienteNatural) {
        ClienteNatural createdCliente = clienteService.saveClienteNatural(clienteNatural);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCliente);
    }

    @DeleteMapping("/naturales/{id}")
    public ResponseEntity<Void> deleteClienteNatural(@PathVariable Long id) {
        clienteService.deleteClienteNatural(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/juridicos")
    public ResponseEntity<Page<ClienteJuridico>> getAllClientesJuridicos(Pageable pageable) {
        Page<ClienteJuridico> page = clienteService.findAllClientesJuridicos(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/juridicos")
    public ResponseEntity<ClienteJuridico> createClienteJuridico(@RequestBody ClienteJuridico clienteJuridico) {
        ClienteJuridico createdCliente = clienteService.saveClienteJuridico(clienteJuridico);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCliente);
    }

    @DeleteMapping("/juridicos/{id}")
    public ResponseEntity<Void> deleteClienteJuridico(@PathVariable Long id) {
        clienteService.deleteClienteJuridico(id);
        return ResponseEntity.noContent().build();
    }
}
