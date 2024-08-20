package com.arcticcuyes.gestion_proyectos.dto.Reunion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitadoDTO {
    private String email;
    private boolean opcional;
}
