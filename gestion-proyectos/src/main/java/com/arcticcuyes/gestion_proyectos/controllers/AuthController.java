package com.arcticcuyes.gestion_proyectos.controllers;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@NoArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final JwtService jwtService;

    @PostMapping(path="/login", consumes = "application/json", produces = "application/json")
    public String login(@RequestParam String username, @RequestParam String password) {
        return jwtSer
    }
    
}
