package com.example.Backend.Service;

import com.example.Backend.Model.Destinatie;
import com.example.Backend.Repository.DestinatieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinatieServiceImplementation {

    @Autowired
    private DestinatieRepository destinatieRepository;

    public void insert(Destinatie destinatie){
        destinatieRepository.save(destinatie);

    }

    public void delete(Long id){
        destinatieRepository.deleteById(id);
    }

    public void update(Destinatie destinatie){
        destinatieRepository.save(destinatie);
    }

    public List<Destinatie> getAllDestinatii(){
        return destinatieRepository.findAll();

    }

    public Optional<Destinatie> findByTitluDestinatie(String titluDestinatie) {
        return destinatieRepository.findByTitluDestinatie(titluDestinatie);
    }


}
