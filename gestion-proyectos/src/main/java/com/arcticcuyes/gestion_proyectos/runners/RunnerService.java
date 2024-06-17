package com.arcticcuyes.gestion_proyectos.runners;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arcticcuyes.gestion_proyectos.models.Rol;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.RolRepository;
import com.arcticcuyes.gestion_proyectos.repositories.UsuarioRepository;

@Service
public class RunnerService {
    @Autowired
    private RolRepository roleRepository;

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void crearUsuariosYRoles(){
         // Crear roles si no existen
        if (roleRepository.findByRol("ROLE_ADMIN") == null) {
            Rol adminRole = new Rol();
            adminRole.setRol("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByRol("ROLE_USER") == null) {
            Rol userRole = new Rol();
            userRole.setRol("ROLE_USER");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByRol("ROLE_CLIENTE") == null) {
            Rol userRole = new Rol();
            userRole.setRol("ROLE_CLIENTE");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByRol("ROLE_CONSULTOR") == null) {
            Rol userRole = new Rol();
            userRole.setRol("ROLE_CONSULTOR");
            roleRepository.save(userRole);
        }

        // Crear usuario administrador si no existe
        if (userRepository.findByEmail("admin@example.org") == null) {
            Usuario adminUser = new Usuario();
            adminUser.setEmail("admin@example.org");
            adminUser.setName("admin");
            adminUser.setPassword(passwordEncoder.encode("password"));  // Ajusta la contraseña según tus necesidades

            Set<Rol> roles = new HashSet<>();
            roles.add(roleRepository.findByRol("ROLE_ADMIN"));
            adminUser.setRoles(roles);

            userRepository.save(adminUser);
        }

        if (userRepository.findByEmail("consultor@example.org") == null) {
            Usuario consultorUser = new Usuario();
            consultorUser.setEmail("consultor@example.org");
            consultorUser.setName("consultor");
            consultorUser.setPassword(passwordEncoder.encode("password"));  // Ajusta la contraseña según tus necesidades

            Set<Rol> roles = new HashSet<>();
            roles.add(roleRepository.findByRol("ROLE_CONSULTOR"));
            consultorUser.setRoles(roles);

            userRepository.save(consultorUser);
        }
    }
}
