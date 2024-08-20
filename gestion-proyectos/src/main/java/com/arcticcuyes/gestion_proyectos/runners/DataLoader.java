package com.arcticcuyes.gestion_proyectos.runners;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DataLoader implements CommandLineRunner{

    @Autowired
    UserRolesRunnerService userRolesRunnerService;

    @Autowired
    EstadosRunnerService estadosRunnerService;

    @Autowired
    ServiciosEntregablesRunnerService serviciosEntregablesRunnerService;

    @Autowired
    FilesDirRunnerService filesDirRunnerService;

    @Override
    public void run(String... args) throws Exception {
        userRolesRunnerService.crearUsuariosYRoles();
        estadosRunnerService.crearEstados();
        serviciosEntregablesRunnerService.createServiciosYEntrgables();

        //dir
        filesDirRunnerService.createFilesDir();
    }
}