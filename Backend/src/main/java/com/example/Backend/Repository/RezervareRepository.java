package com.example.Backend.Repository;

import com.example.Backend.Model.Rezervare;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RezervareRepository extends CrudRepository<Rezervare, Long> {

        List<Rezervare> findAllByLocatie(String locatie);

}
