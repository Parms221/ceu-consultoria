package com.arcticcuyes.gestion_proyectos.repositories;
import com.arcticcuyes.gestion_proyectos.models.ClienteNatural;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteNaturalRepository extends CrudRepository<ClienteNatural, Long>, PagingAndSortingRepository<ClienteNatural, Long> {
}
