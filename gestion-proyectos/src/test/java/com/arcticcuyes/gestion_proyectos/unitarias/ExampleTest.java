package com.arcticcuyes.gestion_proyectos.unitarias;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.arcticcuyes.gestion_proyectos.dto.Servicio.EntregableServicioDTO;
import com.arcticcuyes.gestion_proyectos.dto.Servicio.ServicioDTO;
import com.arcticcuyes.gestion_proyectos.models.EntregableServicio;
import com.arcticcuyes.gestion_proyectos.models.Servicio;
import com.arcticcuyes.gestion_proyectos.repositories.EntregableServicioRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ReunionRepository;
import com.arcticcuyes.gestion_proyectos.repositories.ServicioRepository;
import com.arcticcuyes.gestion_proyectos.services.ReunionService;
import com.arcticcuyes.gestion_proyectos.services.ServicioService;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension.class)
public class ExampleTest {
    
    @Mock
    private ReunionRepository reunionRepository = Mockito.mock(ReunionRepository.class);

    @Mock
    private ServicioRepository servicioRepository = Mockito.mock(ServicioRepository.class);

    @Mock
    private EntregableServicioRepository entregableServicioRepository = Mockito.mock(EntregableServicioRepository.class);

    @InjectMocks
    private ServicioService servicioService = new ServicioService();

    @InjectMocks
    private ReunionService reunionService = new ReunionService();

    @BeforeAll
    public static void beforeAll() {
        MockitoAnnotations.openMocks(ExampleTest.class);
    }

   @Test
   void crearServicio() {
       // Crear un ServicioDTO de prueba
       ServicioDTO servicioDTO = new ServicioDTO();
       servicioDTO.setTitulo("Servicio de Consultoría en IT");
       servicioDTO.setDescripcion("Consultoría para optimización de infraestructura tecnológica");
       servicioDTO.setEntregablesDelServicio(Arrays.asList(
           new EntregableServicioDTO("Evaluación de infraestructura"),
           new EntregableServicioDTO("Recomendaciones de mejora"),
           new EntregableServicioDTO("Plan de implementación")
       ));

       // Crear un Servicio mockeado
       Servicio mockServicio = new Servicio();
       mockServicio.setIdServicio(1L);
       mockServicio.setTitulo(servicioDTO.getTitulo());
       mockServicio.setDescripcion(servicioDTO.getDescripcion());

       // Crear entregables mockeados
        List<EntregableServicio> mockEntregables = new ArrayList<>();
        for (EntregableServicioDTO entregableDTO : servicioDTO.getEntregablesDelServicio()) {
            EntregableServicio mockEntregable = new EntregableServicio();
            mockEntregable.setTitulo(entregableDTO.getTitulo());
            mockEntregables.add(mockEntregable);
        }

        mockServicio.setEntregablesDelServicio(mockEntregables);

       // Configurar el mock del repositorio para devolver el servicio mockeado
        when(this.servicioRepository.save(Mockito.any(Servicio.class))).thenReturn(mockServicio);  
                        
        when(this.entregableServicioRepository.save(Mockito.any(EntregableServicio.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

        // Llamar al método que se está probando
        Servicio resultado = this.servicioService.saveServicio(servicioDTO);
            
       // Verificamos que se ha llamado al método save del repositorio
        verify(this.servicioRepository, Mockito.times(2)).save(Mockito.any(Servicio.class));
        verify(this.entregableServicioRepository, Mockito.times(servicioDTO.getEntregablesDelServicio().size()))
            .save(Mockito.any(EntregableServicio.class));

       // Verificaciones
       Assertions.assertNotNull(resultado.getIdServicio(), "El ID del servicio no debería ser nulo");
       Assertions.assertEquals(servicioDTO.getTitulo(), resultado.getTitulo(), "El título del servicio no coincide");    
       Assertions.assertEquals(servicioDTO.getDescripcion(), resultado.getDescripcion(), "La descripción del servicio no coincide");
       Assertions.assertEquals(servicioDTO.getEntregablesDelServicio().size(), resultado.getEntregablesDelServicio().size(), "El tamaño de los entregables no coincide");

       // Verificar que los entregables se hayan guardado correctamente
       for (int i = 0; i < servicioDTO.getEntregablesDelServicio().size(); i++) {
           EntregableServicioDTO entregableDTO = servicioDTO.getEntregablesDelServicio().get(i);
           EntregableServicio entregable = resultado.getEntregablesDelServicio().get(i);
           Assertions.assertNotNull(entregable, "El entregable no debería ser nulo");
           Assertions.assertEquals(entregableDTO.getTitulo(), entregable.getTitulo(), "El título del entregable no coincide");
       }        
   }
}
