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

    @GetMapping("/get")
    public ResponseEntity<Cliente> searchCliente(@RequestParam(name = "type") String type, @RequestParam(name = "value") String value) {
        if (type.equals("dni")) {
            ClienteNatural cliente = clienteService.findByDni(value);
            if (cliente != null) {
                return ResponseEntity.ok(cliente);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else if (type.equals("ruc")) {
            ClienteJuridico cliente = clienteService.findByRuc(value);
            if (cliente != null) {
                return ResponseEntity.ok(cliente);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable long id) {
        Cliente cliente = clienteService.findClienteById(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @PutMapping("/juridicos/update/{id}")
    public ResponseEntity<String> updateJuridicos(@PathVariable long id, @RequestBody @Valid ClienteJuridicoDto clienteJuridicoDto) {
        ClienteJuridico found = clienteService.findClienteJuridicoById(id);
        if (found != null) {
            clienteService.updateClienteJuridico(found, clienteJuridicoDto);
            return new ResponseEntity<>("Cliente actualizado", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cliente no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/naturales/update/{id}")
    public ResponseEntity<String> updateNaturales(@PathVariable long id, @RequestBody @Valid ClienteNaturalDto clienteNaturalDto) {
        ClienteNatural found = clienteService.findClienteNaturalById(id);
        if (found != null) {
            clienteService.updateClienteNatural(found, clienteNaturalDto);
            return new ResponseEntity<>("Cliente actualizado", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cliente no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }

}
