package com.arcticcuyes.gestion_proyectos.runners;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class UserRolesDataLoader implements CommandLineRunner{

    @Autowired
    RunnerService runnerService;

    @Override
    public void run(String... args) throws Exception {
        runnerService.crearUsuariosYRoles();
    }
}