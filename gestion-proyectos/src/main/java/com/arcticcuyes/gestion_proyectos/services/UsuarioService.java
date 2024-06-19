package com.arcticcuyes.gestion_proyectos.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    
    public List<Usuario> getUsuarios(){
        return (List<Usuario>) uRepository.findAll();
    }    

    public Usuario create(UsuarioDto usuarioDto){
        Usuario newUser = new Usuario();
        newUser.setEmail(usuarioDto.getEmail());
        newUser.setName(usuarioDto.getName());
        newUser.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
        Set<Rol> roles = new HashSet<>();
        for (String rol : usuarioDto.getRoles()){
            System.out.println("ROL ++++ : " + rol);
            roles.add(roleRepository.findByRol(rol));
        }
        newUser.setRoles(roles);
        uRepository.save(newUser);
        return newUser;
    }
}
