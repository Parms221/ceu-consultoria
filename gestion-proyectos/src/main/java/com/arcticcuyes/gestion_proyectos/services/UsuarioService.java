package com.arcticcuyes.gestion_proyectos.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.arcticcuyes.gestion_proyectos.models.Cliente;
import com.arcticcuyes.gestion_proyectos.models.ClienteJuridico;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import com.arcticcuyes.gestion_proyectos.models.Consultor;
import com.arcticcuyes.gestion_proyectos.repositories.ClienteRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ConsultorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arcticcuyes.gestion_proyectos.dto.Usuario.UpdatePasswordDto;
import com.arcticcuyes.gestion_proyectos.dto.Usuario.UpdateUsuarioDto;
import com.arcticcuyes.gestion_proyectos.dto.Usuario.UsuarioDto;
import com.arcticcuyes.gestion_proyectos.models.Rol;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.RolRepository;
import com.arcticcuyes.gestion_proyectos.repositories.UsuarioRepository;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class UsuarioService {
    @Autowired
    private UsuarioRepository uRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RolRepository roleRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ConsultorRepository consultorRepository;

    public List<Usuario> getUsuarios() {
        return (List<Usuario>) uRepository.findAll();
    }

    public Usuario create(UsuarioDto usuarioDto) {
        Cliente cliente = clienteRepository.findById(usuarioDto.getIdCliente()).orElse(null);
        Usuario newUser = new Usuario();
        newUser.setEmail(usuarioDto.getEmail());
        newUser.setName(usuarioDto.getName());
        newUser.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));

        Set<Rol> roles = new HashSet<>();
        for (String rol : usuarioDto.getRoles()) {
            roles.add(roleRepository.findByRol(rol));
        }
        newUser.setRoles(roles);
        Usuario createdUser = uRepository.save(newUser);

        if (cliente != null) {
            cliente.setUsuarioCliente(createdUser);
            clienteRepository.save(cliente);
        }

        // si el rol es Consultor, se crea un nuevo Consultor
        if (roles.contains(roleRepository.findByRol("ROLE_CONSULTOR"))) {
            Consultor consultor = new Consultor();
            consultor.setNombres(usuarioDto.getName());
            consultor.setApellidos("");
            consultor.setGenero('M');
            consultor.setEspecialidades("");
            consultor.setUsuarioConsultor(createdUser);
            consultorRepository.save(consultor);
        }

        return createdUser;
    }

    public Usuario createUsuarioCliente(Cliente cliente) {
        Cliente existingCliente = clienteRepository.findById(cliente.getIdCliente()).orElse(null);
        Usuario usuario = new Usuario();
        usuario.setEmail(cliente.getEmail());
        if(cliente instanceof ClienteNatural){
            ClienteNatural clienteNatural = (ClienteNatural) cliente;
            usuario.setName(clienteNatural.getNombre()+ " " + clienteNatural.getApellido());
            usuario.setPassword(passwordEncoder.encode(clienteNatural.getDni()));
        }else{
            ClienteJuridico clienteJuridico = (ClienteJuridico) cliente;
            usuario.setName(clienteJuridico.getRazonSocial());
            usuario.setPassword(passwordEncoder.encode(clienteJuridico.getRuc()));
        }

        Set<Rol> roles = new HashSet<>();
        roles.add(roleRepository.findByRol("ROLE_CLIENTE"));
        usuario.setRoles(roles);
        
        // asignar usuario al cliente
        existingCliente.setUsuarioCliente(usuario);

        clienteRepository.save(existingCliente);
        uRepository.save(usuario);
        System.out.println("Usuario creado para cliente: " + usuario.getName());
        return usuario;
    }

    public void updatePassword(Usuario current, UpdatePasswordDto passwordDto) throws Exception {
        System.out.println("CURRENT PASSWORD **** " + current.getPassword());
        if (!passwordEncoder.matches(passwordDto.getCurrentPassword(), current.getPassword())) {
            throw new Exception("Contraseña actual incorrecta");
        } else {
            current.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
            uRepository.save(current);
        }
    }

    public void updateUsuario(Usuario current, UpdateUsuarioDto newUsuarioDto) {
        // TODO : CORREGIR ERROR AL ACTUALIZAR EL ROL 
        current.setEmail(newUsuarioDto.getEmail());
        current.setName(newUsuarioDto.getName());
        current.setEnabled(newUsuarioDto.isEnabled());
        Set<Rol> roles = new HashSet<>();
        for (String rol : newUsuarioDto.getRoles()) {
            Rol objRol = roleRepository.findByRol(rol);
            roles.add(objRol);
        }
        current.setRoles(roles);
        uRepository.save(current);
    }

    public void delete(long id) {
        uRepository.deleteById(id);
    }

    public Usuario findById(long id) {
        return uRepository.findById(id).orElse(null);
    }

    public Usuario findByEmail(String email) {
        return uRepository.findByEmail(email);
    }
}
