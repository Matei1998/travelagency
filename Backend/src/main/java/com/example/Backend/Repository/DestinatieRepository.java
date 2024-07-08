package com.example.Backend.Repository;

import com.example.Backend.Model.Destinatie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DestinatieRepository extends CrudRepository<Destinatie,Long> {

    List<Destinatie> findAll();

    Optional<Destinatie> findByTitluDestinatie(String titluDestinatie);

}
