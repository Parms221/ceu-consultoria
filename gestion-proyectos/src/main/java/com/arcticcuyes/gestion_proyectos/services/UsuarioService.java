package com.arcticcuyes.gestion_proyectos.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
            roles.add(roleRepository.findByRol(rol));
        }
        newUser.setRoles(roles);
        uRepository.save(newUser);
        return newUser;
    }

    public void updatePassword(Usuario current, UpdatePasswordDto passwordDto) throws Exception{
        System.out.println("CURRENT PASSWORD **** " + current.getPassword());
        if (!passwordEncoder.matches(passwordDto.getCurrentPassword(), current.getPassword())){
            throw new Exception("Contraseña actual incorrecta");
        }else {
            current.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
            uRepository.save(current);
        }
    }

    public void updateUsuario(Usuario current, UpdateUsuarioDto newUsuarioDto){
        // TODO : CORREGIR ERROR AL ACTUALIZAR EL ROL 
        current.setEmail(newUsuarioDto.getEmail());
        current.setName(newUsuarioDto.getName());
        current.setEnabled(newUsuarioDto.isEnabled());
        Set<Rol> roles = new HashSet<>();
        for (String rol : newUsuarioDto.getRoles()){
            Rol objRol = roleRepository.findByRol(rol);
            roles.add(objRol);
        }
        current.setRoles(roles);
        uRepository.save(current);
    }

    public void delete(long id){
        uRepository.deleteById(id);
    }

    public Usuario findById(long id){
        return uRepository.findById(id).orElse(null);
    }
}
